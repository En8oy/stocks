import { LiquidEther } from "@/components/LiquidEther"
import { LiquidText } from "@/components/AnimatedText"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen text-white relative flex items-center justify-center">
      <LiquidEther />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <TrendingUp className="w-8 h-8 text-blue-500" />
                <div className="absolute inset-0 blur-lg bg-blue-500/50" />
              </div>
              <span className="text-2xl font-bold">
                <LiquidText>StockHub</LiquidText>
              </span>
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link href="/#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">{children}</div>
    </div>
  )
}
