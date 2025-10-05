import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LiquidEther } from "@/components/LiquidEther"
import { LiquidText } from "@/components/AnimatedText"
import { SplitText } from "@/components/SplitText"
import { TrendingUp, Users, Target, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function About() {
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
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/about" className="text-white">About</Link>
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
            <SplitText>About StockHub</SplitText>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering investors worldwide with cutting-edge technology and real-time market insights
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4 inline-block">Our Mission</span>
              <h2 className="text-5xl font-bold mb-6">
                <LiquidText>Democratizing Finance</LiquidText>
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                We believe that everyone should have access to professional-grade trading tools and market intelligence. Our mission is to level the playing field by providing retail investors with the same powerful analytics that institutional traders use.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Through innovation, transparency, and a relentless focus on user experience, we're building the future of investing.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <Card className="relative p-8 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
                <div className="space-y-6">
                  {[
                    { icon: <Target className="w-6 h-6" />, title: "User-Centric Design", desc: "Built with traders in mind" },
                    { icon: <Award className="w-6 h-6" />, title: "Industry Leading", desc: "Award-winning platform" },
                    { icon: <Users className="w-6 h-6" />, title: "Community Driven", desc: "100K+ active investors" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-4 inline-block">Our Values</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Drives <LiquidText>Our Team</LiquidText>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description: "We believe in complete transparency in our operations, pricing, and data sources. No hidden fees, no surprises.",
                points: ["Clear pricing", "Open data sources", "Honest communication"]
              },
              {
                title: "Innovation",
                description: "Constantly pushing the boundaries of what's possible in fintech through AI, machine learning, and cutting-edge technology.",
                points: ["AI-powered insights", "Real-time analytics", "Continuous improvement"]
              },
              {
                title: "Security",
                description: "Your financial data and privacy are our top priority. We employ bank-level security measures to protect your information.",
                points: ["256-bit encryption", "Multi-factor auth", "SOC 2 compliant"]
              },
            ].map((value) => (
              <Card key={value.title} className="p-8 bg-slate-900/40 backdrop-blur-sm border-slate-800/50 hover:border-slate-700 transition-all">
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{value.description}</p>
                <ul className="space-y-3">
                  {value.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Founded", value: "2020" },
              { label: "Team Members", value: "50+" },
              { label: "Countries", value: "120+" },
              { label: "Funding", value: "$50M" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-8 rounded-2xl bg-slate-900/30 backdrop-blur-sm border border-slate-800/50">
                <div className="text-5xl font-bold mb-2">
                  <LiquidText>{stat.value}</LiquidText>
                </div>
                <div className="text-slate-500 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
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
                Join Our <LiquidText className="text-white">Journey</LiquidText>
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Be part of the investing revolution. Start trading smarter today.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-10 py-7 shadow-2xl group">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link href="/#features">
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
