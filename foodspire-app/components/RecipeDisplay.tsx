"use client"

import React, { useState, useEffect } from 'react'

const apiKey = process.env.NEXT_PUBLIC_API_KEY;  // Access the API key in the client

// gc logging
//console.log('apiKey: ', apiKey);     // Do not print this!

if (!apiKey) {
  console.error("API_KEY not found in environment variables.");
}


export function RecipeDisplay({ mealType, ingredients, searchTrigger }: { mealType: string; ingredients: string; searchTrigger: number }) {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prompt, setPrompt] = useState('')
  const [apiResponse, setApiResponse] = useState(null)
  const [recipeText, setRecipeText] = useState('')
  const [recipeJsonString, setRecipeJsonString] = useState('')

  useEffect(() => {
    if (mealType && searchTrigger > 0) {
      fetchRecipe(mealType, ingredients)
    }
  }, [searchTrigger])

  const fetchRecipe = async (meal: string, userIngredients: string) => {
    setLoading(true)
    setError('')

    const generationPrompt = userIngredients
      ? `Retrieve a random recipe for a healthy ${meal}, incorporating some or all of these ingredients: ${userIngredients}.
Return the response as a JSON string formatted like this:
{
  "dishName": "string",
  "unusualIngredients": "string or null",
  "ingredients": ["string", "string", ...],
  "instructions": ["string", "string", ...]
}`
      : `Retrieve a random recipe for a healthy ${meal}.
Return the response as a JSON string formatted like this:
{
  "dishName": "string",
  "ingredients": ["string", "string", ...],
  "instructions": ["string", "string", ...]
}`

    setPrompt(generationPrompt)
    
    // gc logging
    //console.log('Used prompt:', generationPrompt);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //contents: [{ parts: [{ text: prompt }] }],
            contents: [{ parts: [{ text: generationPrompt}] }],
          }),
        }
      )

      // gc loggin
      //console.log('LLM response status: ', response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch recipe: ${response.status}`); // More specific error message
      }

      const data = await response.json()
      setApiResponse(data)

      // Extract the recipe text and parse it
      const recipeText = data.candidates[0]?.content.parts[0]?.text || ''
      //const recipeText = data['candidates'][0]['content']['parts'][0]['text']
        
      const recipeJsonString = recipeText
        .replace(/```json\s*/, '')  // Remove the leading ```json with possible spaces/newlines
        .replace(/```\s*$/, '')     // Remove the trailing ``` with possible spaces/newlines
        .trim();                    // Remove extra spaces or newlines

    
     // gc loggin
      //console.log('Cleaned recipeJsonString:', recipeJsonString);


      try {
        const recipeData = JSON.parse(recipeJsonString)
        setRecipe(recipeData)
      } catch (parseError) {
        console.error('Error parsing recipe JSON:', parseError)
        setError('Failed to parse the recipe data. Please try again.')
      }
    } catch (err) {
      setError('Failed to fetch recipe. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

const formatRecipe = (recipeData) => {
  if (!recipeData) return null;

  const { dishName, unusualIngredients, ingredients, instructions } = recipeData;

  return (
    <>
      <h3 className="text-2xl font-bold mb-2 text-green-800">{dishName}</h3>
      {unusualIngredients && <p className="italic mb-4 text-gray-600">{unusualIngredients}</p>}
      <h4 className="text-lg font-bold mb-2 text-gray-700">Ingredients</h4>
      <ul className="list-disc ml-5 mb-4"> {/* Added 'mb-4' for spacing */}
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4 className="text-lg font-bold mb-2 text-gray-700">Instructions</h4>
      <ol className="list-decimal ml-5">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </>
  )
}


  return (
    <div className="p-4 bg-green-50 rounded-md shadow-sm">
      {recipeText && (
        <div className="mb-4 p-2 bg-gray-100 rounded-md shadow-sm">
          <h4 className="font-bold">Extracted Recipe Text:</h4>
          <pre>{recipeText}</pre>
        </div>
      )}
      {recipeJsonString && (
        <div className="mb-4 p-2 bg-gray-100 rounded-md shadow-sm">
          <h4 className="font-bold">Parsed Recipe JSON String:</h4>
          <pre>{recipeJsonString}</pre>
        </div>
      )}
      {loading && <div className="p-4 bg-yellow-50 rounded-md shadow-sm">Loading recipe...</div>}
      {error && <div className="p-4 bg-red-50 rounded-md shadow-sm text-red-600">{error}</div>}
      {recipe ? formatRecipe(recipe) : <p className="text-gray-500">Select a meal type and click "Foodspire Me!" to get a recipe!</p>}
    </div>
  )
}