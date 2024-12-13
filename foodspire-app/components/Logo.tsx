import React from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#4CAF50" />
      <path
        d="M30 70C30 57.85 39.85 48 52 48H68C68 60.15 58.15 70 46 70H30Z"
        fill="white"
      />
      <path
        d="M40 35L45 45M60 35L55 45"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M45 60C45 57.7909 46.7909 56 49 56H51C53.2091 56 55 57.7909 55 60V60C55 62.2091 53.2091 64 51 64H49C46.7909 64 45 62.2091 45 60V60Z"
        fill="white"
      />
    </svg>
  )
}

