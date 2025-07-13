# 🧠 MindEase – Mental Health Journal & AI Chatbot

**MindEase** is a modern, full-stack web application dedicated to promoting mental wellness through journaling, mood tracking, AI-powered conversations, and access to personalized resources. It creates a private, supportive space for users to reflect, express themselves, and seek guidance — anytime, anywhere.

---

## 🌟 Features

* ✍️ **Private Journaling**
  Securely write and revisit your thoughts and feelings over time.

* 📊 **Mood Tracking**
  Log daily moods and visualize emotional patterns through charts.

* 🤖 **AI-Powered Chatbot**
  Engage in real-time, empathetic conversations powered by artificial intelligence.

* 📚 **Personalized Resource Library**
  Access curated articles, mental health tips, exercises, and tools.

* 💬 **Community Feedback System**
  Anonymously view and share experiences to foster connection and support.

* 🚨 **Crisis Support Access**
  Quick access to emergency mental health resources and helplines.

* 🌙 **Responsive UI with Dark Mode**
  Visually calming design, optimized for all devices with support for both light and dark themes.

---

## ⚙️ Tech Stack

### 🖥 Frontend

* **Next.js** – React-based framework for fast rendering and routing
* **React** – Component-based UI library
* **Tailwind CSS** – Utility-first CSS framework
* **Dark Mode Support** – Enhances comfort and accessibility

### 🗄 Backend

* **Node.js** – JavaScript runtime for backend logic
* **Express.js** – Minimalist API framework
* **MongoDB** – NoSQL database for journals, moods, and resources
* **Mongoose** – ODM for MongoDB integration

### 🔐 Authentication & Security

* **JWT / Sessions** – Secure authentication
* **Environment Variables** – Managed using `.env`
* **Input Validation & Sanitization** – Protects against security threats

---

## 🚀 How to Run the Project

### 📦 Prerequisites

* Node.js and npm installed
* Python 3 installed
* MongoDB instance running (local or MongoDB Atlas)
* Groq API key (for chatbot integration)

---

### 🔧 Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/mindease.git
   cd mindease
   ```

2. **Start Backend Server**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Run AI Chatbot Server**

   ```bash
   cd chatbot
   export GROQ_API_KEY=your_key_here  # Use 'set GROQ_API_KEY=your_key_here' on Windows
   python test.py
   ```

4. **Start Frontend**

   ```bash
   cd frontend
   npm install
   # On macOS/Linux:
   PORT=3000 npm run dev
   # On Windows:
   npm run dev
   ```

5. **Visit the App**
   Open your browser and go to:
   **[http://localhost:3000](http://localhost:3000)**

---

## 👨‍💻 Team

| Name               | Role                   | Email                                                         |
| ------------------ | ---------------------- | ------------------------------------------------------------- |
| Dishant Dhyani     | Frontend Developer     | [dishantdhyani01@gmail.com](mailto:dishantdhyani01@gmail.com) |
| Gunottam Maini     | AI Chatbot Integration | [gunottammaini@gmail.com](mailto:gunottammaini@gmail.com)     |
| Satyam Singh Rawat | Backend Developer      | [rawatsatyam058@gmail.com](mailto:rawatsatyam058@gmail.com)   |
| Harshit Negi       | Backend Developer      | [negiharshit89@gmail.com](mailto:negiharshit89@gmail.com)     |

---

## 🔒 Privacy & Philosophy

MindEase is built on the principle that mental health support should be **private, non-judgmental, and accessible**. Every feature is designed to empower users on their emotional journey while protecting their data and autonomy.
