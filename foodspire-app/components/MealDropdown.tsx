"use client"

import React, { useState } from 'react'

const meals = [
  { value: "breakfast", label: "Breakfast" },
  { value: "morning-snack", label: "Morning snack" },
  { value: "lunch", label: "Lunch" },
  { value: "afternoon-snack", label: "Afternoon snack" },
  { value: "dinner", label: "Dinner" },
]

export function MealDropdown({ onSelect }: { onSelect: (meal: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState('')

  const handleSelect = (value: string) => {
    setSelectedMeal(value)
    setIsOpen(false)
    onSelect(value)
  }

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 text-left bg-white border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {selectedMeal ? meals.find(m => m.value === selectedMeal)?.label : "Select a meal..."}
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-green-300 rounded-md shadow-lg z-10">
          {meals.map((meal) => (
            <li
              key={meal.value}
              onClick={() => handleSelect(meal.value)}
              className="p-2 hover:bg-green-50 cursor-pointer"
            >
              {meal.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

