import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const userId = useGetUserId();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const resetForm = () => {
    setRecipe({
      name: "",
      ingredients: [],
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      userOwner: userId,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!recipe.name || !recipe.ingredients.length || !recipe.instructions) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    if (!recipe.userOwner) {
      alert("User not authenticated. Please log in first.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created!");
      resetForm(); // Clear form after successful submission
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to create the recipe. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-75 border border-success border-3 p-3 mx-auto rounded shadow-sm">
      <h2 className="text-center">Create Recipe</h2>
      <form onSubmit={onSubmit}>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded border-black shadow-sm"
            placeholder="Enter Your Recipe Name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="ingredients" className="form-label w-100">
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input
                type="text"
                placeholder="Add Your Ingredient"
                className="form-control rounded border-black shadow-sm"
                value={ingredient}
                onChange={(event) => handleIngredientChange(event, index)}
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeIngredient(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-info text-white"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>

        <div className="mb-2">
          <label htmlFor="instructions" className="form-label">
            Instructions
          </label>
          <textarea
            type="text"
            className="form-control rounded border-black shadow-sm"
            placeholder="Enter Your Instructions Step by Step..."
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control rounded border-black shadow-sm"
            name="imageUrl"
            placeholder="Enter Your Image URL"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="cookingTime" className="form-label">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            className="form-control rounded border-black shadow-sm"
            placeholder="Estimated Time for Cooking"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
