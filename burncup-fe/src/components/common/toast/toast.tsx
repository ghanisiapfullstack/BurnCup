"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"

export interface ToastProps {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const showTimer = setTimeout(() => setIsVisible(true), 100)

    // Auto-dismiss timer
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(dismissTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(id)
    }, 300) // Match the exit animation duration
  }

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
        }
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: XCircle,
          iconColor: "text-red-600",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
        }
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: AlertTriangle,
          iconColor: "text-amber-600",
          titleColor: "text-amber-800",
          messageColor: "text-amber-700",
        }
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: Info,
          iconColor: "text-blue-600",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: Info,
          iconColor: "text-gray-600",
          titleColor: "text-gray-800",
          messageColor: "text-gray-700",
        }
    }
  }

  const styles = getToastStyles()
  const Icon = styles.icon

  return (
    <div
      className={`
        relative max-w-sm w-full ${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4
        transform transition-all duration-300 ease-in-out
        ${
          isVisible && !isLeaving
            ? "translate-y-0 opacity-100 scale-100"
            : isLeaving
              ? "translate-y-[-20px] opacity-0 scale-95"
              : "translate-y-[-20px] opacity-0 scale-95"
        }
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${styles.titleColor} mb-1`}>{title}</h4>
          {message && <p className={`text-sm ${styles.messageColor}`}>{message}</p>}
        </div>
        <button
          onClick={handleClose}
          className={`flex-shrink-0 ${styles.iconColor} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div
          className={`h-full transition-all ease-linear ${
            type === "success"
              ? "bg-green-500"
              : type === "error"
                ? "bg-red-500"
                : type === "warning"
                  ? "bg-amber-500"
                  : "bg-blue-500"
          }`}
          style={{
            animation: `shrink ${duration}ms linear`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}
