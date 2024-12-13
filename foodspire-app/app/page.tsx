"use client"

import React, { useState } from 'react'
import { MealDropdown } from '../components/MealDropdown'
import { RecipeDisplay } from '../components/RecipeDisplay'
import { IngredientsInput } from '../components/IngredientsInput'
import { Logo } from '../components/Logo'

export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [searchTrigger, setSearchTrigger] = useState(0)
  const [error, setError] = useState('')

  const handleFoodspireClick = () => {
    if (selectedMeal) {
      setSearchTrigger(prev => prev + 1)
      setError('')
    } else {
      setError("Please select a meal type")
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <Logo className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">Foodspiration</h1>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-green-700">Meal Type</h2>
            <MealDropdown onSelect={setSelectedMeal} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-green-700">Main Ingredients (optional)</h2>
            <IngredientsInput onIngredientsChange={setIngredients} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-green-700">Your Recipe</h2>
            <RecipeDisplay mealType={selectedMeal} ingredients={ingredients} searchTrigger={searchTrigger} />
          </div>
          <div className="mt-4">
            <button
              onClick={handleFoodspireClick}
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Foodspire Me!
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

