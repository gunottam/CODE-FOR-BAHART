"use client"

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function Stars() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || resolvedTheme !== 'dark') {
        return null
    }

    const generateStars = () => {
        const stars = []
        for (let i = 0; i < 100; i++) {
            const size = Math.random() * 3 + 1
            const duration = Math.random() * 3 + 2
            const delay = Math.random() * 3

            stars.push(
                <div
                    key={i}
                    className="star"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        '--duration': `${duration}s`,
                        animationDelay: `${delay}s`
                    }}
                />
            )
        }
        return stars
    }

    return (
        <div className="stars">
            {generateStars()}
        </div>
    )
} 