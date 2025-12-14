"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Mode = "men" | "women" | "kids"

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("men")

  useEffect(() => {
    // Load saved mode from localStorage
    const savedMode = localStorage.getItem("shopMode") as Mode
    if (savedMode && ["men", "women", "kids"].includes(savedMode)) {
      setMode(savedMode)
    }
  }, [])

  const handleSetMode = (newMode: Mode) => {
    setMode(newMode)
    localStorage.setItem("shopMode", newMode)
  }

  return <ModeContext.Provider value={{ mode, setMode: handleSetMode }}>{children}</ModeContext.Provider>
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
