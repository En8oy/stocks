interface PasswordStrengthIndicatorProps {
  strength: {
    score: number
    feedback: string
    color: string
  }
}

export function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  if (!strength.feedback) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i < strength.score
                ? strength.color === "red"
                  ? "bg-red-500"
                  : strength.color === "yellow"
                  ? "bg-yellow-500"
                  : strength.color === "blue"
                  ? "bg-blue-500"
                  : "bg-green-500"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs ${
          strength.color === "red"
            ? "text-red-400"
            : strength.color === "yellow"
            ? "text-yellow-400"
            : strength.color === "blue"
            ? "text-blue-400"
            : "text-green-400"
        }`}
      >
        {strength.feedback}
      </p>
    </div>
  )
}
