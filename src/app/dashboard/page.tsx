import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LiquidText } from "@/components/AnimatedText"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  LogOut,
  User
} from "lucide-react"
import Link from "next/link"

export default async function Dashboard() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile data
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <DashboardLayout>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {profile?.first_name}! 👋
          </h1>
          <p className="text-slate-400">
            Here's what's happening with your investments today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4" />
                12.5%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Balance</p>
            <p className="text-3xl font-bold text-white">$24,500.00</p>
          </Card>

          <Card className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4" />
                8.2%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Profit</p>
            <p className="text-3xl font-bold text-white">$3,420.00</p>
          </Card>

          <Card className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                <ArrowDownRight className="w-4 h-4" />
                2.1%
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Active Positions</p>
            <p className="text-3xl font-bold text-white">12</p>
          </Card>

          <Card className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                Diversified
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Portfolio Health</p>
            <p className="text-3xl font-bold text-white">Good</p>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {[
                { name: "AAPL", type: "Buy", amount: "+50 shares", price: "$8,500.00", change: "+2.4%", positive: true },
                { name: "TSLA", type: "Sell", amount: "-25 shares", price: "$4,250.00", change: "+5.2%", positive: true },
                { name: "GOOGL", type: "Buy", amount: "+30 shares", price: "$3,900.00", change: "-1.1%", positive: false },
              ].map((transaction, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      transaction.type === "Buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}>
                      {transaction.name}
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.type}</p>
                      <p className="text-sm text-slate-400">{transaction.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{transaction.price}</p>
                    <p className={`text-sm ${transaction.positive ? "text-green-500" : "text-red-500"}`}>
                      {transaction.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-800/50">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 justify-start">
                <TrendingUp className="w-5 h-5 mr-2" />
                Buy Stock
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 justify-start">
                <TrendingDown className="w-5 h-5 mr-2" />
                Sell Stock
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 justify-start">
                <Activity className="w-5 h-5 mr-2" />
                View Portfolio
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 justify-start">
                <PieChart className="w-5 h-5 mr-2" />
                Analytics
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      {profile?.subscription_tier === "free" ? "Upgrade to Pro" : "You're on Pro"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {profile?.subscription_tier === "free"
                        ? "Get advanced analytics and AI insights"
                        : "Enjoying all premium features"}
                    </p>
                  </div>
                </div>
                {profile?.subscription_tier === "free" && (
                  <Link href="/pricing">
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
                      Upgrade Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  )
}
