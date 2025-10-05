"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

export function SplitText({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (typeof children !== 'string') {
    return <div className={className}>{children}</div>
  }

  const words = children.split(' ')

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.6s ease ${i * 0.05}s`
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  )
}
