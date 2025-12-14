"use client"

import { useMode, type Mode } from "@/lib/mode-context"
import { Button } from "@/components/ui/button"

export function ModeSwitcher() {
  const { mode, setMode } = useMode()

  const modes: { value: Mode; label: string }[] = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
  ]

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
      {modes.map((m) => (
        <Button
          key={m.value}
          onClick={() => setMode(m.value)}
          variant={mode === m.value ? "default" : "ghost"}
          size="sm"
          className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
            mode === m.value
              ? mode === "men"
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                : mode === "women"
                  ? "bg-pink-500 text-white hover:bg-pink-600 shadow-md"
                  : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
              : "hover:bg-gray-100"
          }`}
        >
          {m.label}
        </Button>
      ))}
    </div>
  )
}
