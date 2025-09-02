"use client"

import { useState, useEffect } from "react"
import Button from "./Button"

interface StatusModalProps {
  isOpen: boolean
  statusCode?: number
  message: string
  onClose: () => void
  onStart?: () => void
}

export default function StatusModal({
  isOpen,
  statusCode,
  message,
  onClose,
  onStart,
}: StatusModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  const isSuccess = statusCode === 200 || statusCode === 201

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center !top-0 !left-0 !pt-0">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-sm w-full">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center text-center pt-4">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 ${
              isSuccess ? "bg-black" : "bg-red-500"
            }`}
          >
            {isSuccess ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <h2 className="text-2xl font-bold text-black mb-12 leading-relaxed">
            {message}
          </h2>

          <Button
            onClick={() => {
              onStart?.()
              onClose()
            }}
          >
            {isSuccess ? "확인" : "닫기"}
          </Button>
        </div>
      </div>
    </div>
  )
}