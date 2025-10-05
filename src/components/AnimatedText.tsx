"use client"

import { ReactNode } from "react"

export function LiquidText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block animate-liquid-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

export function FadeInText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`animate-fade-in ${className}`}>
      {children}
    </div>
  )
}
