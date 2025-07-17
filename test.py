from flask import Flask, request, jsonify, session
import os
from groq import Groq
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'mentalwellness_secret')  # Needed for session

# --- Mental Wellness Chatbot Utility ---
def get_mental_wellness_response(client, message_history):
    # Compose the message history for the LLM
    messages = []
    for entry in message_history:
        messages.append({"role": "user", "content": entry["user"]})
        if entry.get("bot"):
            messages.append({"role": "assistant", "content": entry["bot"]})
    # Add system prompt at the start
    system_prompt = (
        "You are a compassionate and supportive mental wellness chatbot. "
        "Greet the user warmly if they say hi or hello. "
        "If the user shares how they are feeling or what they are going through, listen empathetically, "
        "summarize their feelings, and offer gentle, practical guidance or encouragement. "
        "If appropriate, suggest simple self-care tips, grounding exercises, or recommend reaching out to a professional if needed. "
        "Always keep your tone positive, non-judgmental, and supportive."
    )
    messages = [{"role": "system", "content": system_prompt}] + messages
    response = client.chat.completions.create(
        messages=messages,
        model="llama3-70b-8192"
    )
    return response.choices[0].message.content.strip()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').strip()
    if not user_message:
        return jsonify({"error": "No message provided."}), 400
    api_key = os.getenv("GROK_KEY")
    if not api_key:
        return jsonify({"error": "GROK_KEY environment variable not set. Please add it to your .env file."}), 500
    client = Groq(api_key=api_key)
    # Load or initialize chat history from session
    chat_history = session.get('chat_history', [])
    chat_history.append({"user": user_message})
    # Get bot reply
    bot_reply = get_mental_wellness_response(client, chat_history)
    chat_history[-1]["bot"] = bot_reply
    session['chat_history'] = chat_history
    return jsonify({"reply": bot_reply, "history": chat_history})

@app.route('/reset', methods=['POST'])
def reset():
    session.pop('chat_history', None)
    return jsonify({"message": "Chat history reset."})

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Mental Wellness Chatbot! POST to /chat with a JSON body: { 'message': 'your text' }. POST to /reset to clear chat history."})

if __name__ == '__main__':
    app.run(debug=True, port=3001)