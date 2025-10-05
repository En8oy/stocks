import { useState } from "react"

interface PasswordStrength {
  score: number
  feedback: string
  color: string
}

export function usePasswordValidation() {
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: "",
    color: "slate",
  })

  const validatePasswordStrength = (pwd: string) => {
    let score = 0
    let feedback = ""
    let color = "slate"

    if (pwd.length === 0) {
      setPasswordStrength({ score: 0, feedback: "", color: "slate" })
      return
    }

    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
    if (/\d/.test(pwd)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++

    if (score <= 2) {
      feedback = "Weak password"
      color = "red"
    } else if (score <= 3) {
      feedback = "Fair password"
      color = "yellow"
    } else if (score <= 4) {
      feedback = "Good password"
      color = "blue"
    } else {
      feedback = "Strong password"
      color = "green"
    }

    setPasswordStrength({ score, feedback, color })
  }

  return {
    passwordStrength,
    validatePasswordStrength,
  }
}
