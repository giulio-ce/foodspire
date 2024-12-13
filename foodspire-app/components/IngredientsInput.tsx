"use client"

import React from 'react'

export function IngredientsInput({ onIngredientsChange }: { onIngredientsChange: (ingredients: string) => void }) {
  return (
    <textarea
      className="w-full p-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      placeholder="Enter main ingredients (optional)"
      rows={3}
      onChange={(e) => onIngredientsChange(e.target.value)}
    />
  )
}

