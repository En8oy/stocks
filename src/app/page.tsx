import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LiquidEther } from "@/components/LiquidEther"
import { LiquidText, FadeInText } from "@/components/AnimatedText"
import { SplitText } from "@/components/SplitText"
import { TrendingUp, BarChart3, LineChart, Shield, Zap, Globe, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
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
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 group">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Trusted by 100K+ investors worldwide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <SplitText>Master the Market</SplitText>
            <br />
            <LiquidText className="text-7xl md:text-9xl">
              Trade Smarter
            </LiquidText>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Real-time stock analytics, AI-powered insights, and portfolio management for modern investors
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center mb-20 flex-wrap">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg px-8 py-6 shadow-2xl shadow-blue-500/20 group">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-700 hover:bg-slate-800/50 backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { label: "Active Users", value: "100K+" },
              { label: "Markets", value: "50+" },
              { label: "Data Points", value: "10M+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-slate-900/30 backdrop-blur-sm border border-slate-800/50">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <LiquidText>{stat.value}</LiquidText>
                </div>
                <div className="text-slate-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4 inline-block">Features</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to <br />
              <LiquidText>Dominate the Markets</LiquidText>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Cutting-edge tools designed for professional traders and investors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <LineChart className="w-10 h-10" />,
                title: "Real-Time Analytics",
                description: "Live market data with advanced charting and AI-powered technical indicators for instant insights",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <BarChart3 className="w-10 h-10" />,
                title: "Portfolio Tracking",
                description: "Monitor investments across multiple accounts with detailed performance analytics and reports",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Bank-Level Security",
                description: "Military-grade encryption and multi-factor authentication to protect your financial data",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Lightning Fast",
                description: "Real-time updates with sub-millisecond latency for split-second trading decisions",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Global Markets",
                description: "Access stocks, crypto, forex, and commodities from markets worldwide, 24/7",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "Smart Alerts",
                description: "AI-driven notifications for price movements, volume spikes, and critical market events",
                gradient: "from-rose-500 to-red-500"
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="group relative p-8 bg-slate-900/40 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-16 md:p-24 text-center bg-gradient-to-br from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-50" />

            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Ready to Transform Your <br />
                <LiquidText className="text-white">Trading Game?</LiquidText>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Join thousands of successful investors who trust StockHub for their portfolio management
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-10 py-7 shadow-2xl group">
                  Start Trading Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold">
                <LiquidText>StockHub</LiquidText>
              </span>
            </div>
            <p className="text-slate-500">&copy; 2025 StockHub. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
