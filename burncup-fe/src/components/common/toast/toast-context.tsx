"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { ToastContainer } from "./toast_container"
import type { ToastProps } from "./toast"

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, "id" | "onClose">) => void
  showSuccess: (title: string, message?: string, duration?: number) => void
  showError: (title: string, message?: string, duration?: number) => void
  showWarning: (title: string, message?: string, duration?: number) => void
  showInfo: (title: string, message?: string, duration?: number) => void
  dismissToast: (id: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const showToast = useCallback((toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = generateId()
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: dismissToast,
    }

    setToasts((prev) => [...prev, newToast])
  }, [])

  const showSuccess = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: "success", title, message, duration })
    },
    [showToast],
  )

  const showError = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: "error", title, message, duration })
    },
    [showToast],
  )

  const showWarning = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: "warning", title, message, duration })
    },
    [showToast],
  )

  const showInfo = useCallback(
    (title: string, message?: string, duration?: number) => {
      showToast({ type: "info", title, message, duration })
    },
    [showToast],
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        dismissToast,
        dismissAll,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onClose={dismissToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
