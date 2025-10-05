import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LiquidEther } from "@/components/LiquidEther"
import { LiquidText } from "@/components/AnimatedText"
import { SplitText } from "@/components/SplitText"
import { TrendingUp, Check, ArrowRight, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
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
              <Link href="/#features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="text-white">Pricing</Link>
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
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <SplitText>Simple, Transparent Pricing</SplitText>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your trading journey. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="relative p-8 bg-slate-900/40 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-all">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-slate-400">Perfect for beginners</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    <LiquidText>$0</LiquidText>
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Real-time market data",
                  "Basic charting tools",
                  "5 watchlists",
                  "Email support",
                  "Mobile app access",
                  "Community access",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-slate-800 hover:bg-slate-700" size="lg">
                Get Started Free
              </Button>
            </Card>

            {/* Pro Plan - Featured */}
            <Card className="relative p-8 bg-slate-900/40 backdrop-blur-sm border-blue-500/50 hover:border-blue-500 transition-all scale-105 shadow-2xl shadow-blue-500/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold">
                Most Popular
              </div>

              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-slate-400">For serious traders</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    <LiquidText>$29</LiquidText>
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Starter",
                  "Advanced analytics",
                  "Unlimited watchlists",
                  "AI-powered insights",
                  "Priority support",
                  "Custom alerts",
                  "API access",
                  "Export data",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500" size="lg">
                Start 14-Day Trial
              </Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative p-8 bg-slate-900/40 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-all">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-slate-400">For institutions</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    <LiquidText>Custom</LiquidText>
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Pro",
                  "Dedicated account manager",
                  "Custom integrations",
                  "White-label solutions",
                  "Advanced security",
                  "SLA guarantee",
                  "Onboarding & training",
                  "24/7 phone support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-slate-800 hover:bg-slate-700" size="lg">
                Contact Sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Frequently Asked <LiquidText>Questions</LiquidText>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I switch plans anytime?",
                answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we'll prorate any charges."
              },
              {
                question: "Is there a free trial?",
                answer: "The Starter plan is free forever. Pro and Enterprise plans come with a 14-day free trial, no credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfers for Enterprise customers."
              },
              {
                question: "Do you offer student or educational discounts?",
                answer: "Yes! Students and educators get 50% off Pro plans. Contact our support team with your educational institution email."
              },
              {
                question: "What's your refund policy?",
                answer: "We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment, no questions asked."
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-all">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
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
                Ready to Get <LiquidText className="text-white">Started?</LiquidText>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Join thousands of investors who trust StockHub for their trading needs
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-10 py-7 shadow-2xl group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                    Learn More
                  </Button>
                </Link>
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
