"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LiquidText } from "@/components/AnimatedText"
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { useAuth } from "@/hooks/useAuth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const { isLoading, error, message, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await resetPassword(email)
  }

  return (
    <AuthLayout>
      <Card className="p-12 bg-slate-900/60 backdrop-blur-xl border-slate-800/50">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <LiquidText>Reset Password</LiquidText>
          </h1>
          <p className="text-slate-400">Enter your email to receive a reset link</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/50 text-blue-400 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-6 text-lg group"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Sending reset link...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  )
}
