import React, { useEffect, useState } from "react";
import axios from "axios"; // Corrected typo here
import { useGetUserId } from "../hooks/useGetUserId";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const userID = useGetUserId();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSavedRecipes = async () => {
      if (userID) {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/saveRecipes/ids/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes || []); // Ensure it's set to an empty array if undefined
        } catch (error) {
          setError("Failed to fetch saved recipes.");
        }
      }
    };

    fetchRecipes();

    fetchSavedRecipes();
  }, [userID]); // Added userID to dependency array

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put("http://localhost:3001/recipes", { recipeID, userID });
      // Optionally, you can update the savedRecipes state here
      setSavedRecipes((prev) => [...prev, recipeID]);
    } catch (error) {
      setError("Failed to save recipe.");
    }
  };

  if (loading) {
    return <h2 className="text-center">Loading...</h2>; // Loading state
  }

  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>; // Display error message
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h2 className="text-center">Recipes</h2>
      <ul className="list-unstyled container-fluid d-flex">
        {recipes.map((recipe) => (
          <li className="m-3" key={recipe._id}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={recipe.imageUrl}
                className="card-img-top"
                alt={recipe.name}
              />
              <div className="card-body">
                {/* Check if savedRecipes is defined before calling includes */}
                {/* {Array.isArray(savedRecipes) && savedRecipes.includes(recipe._id) && <p>Already Saved</p>} */}
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.instructions}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h6>Ingredients:</h6>
                </li>
                {recipe.ingredients.map((ingredient, i) => (
                  <li className="list-group-item" key={i}>
                    {ingredient}
                  </li>
                ))}
              </ul>
              <div className="card-body border-top">
                <p className="">Cooking Time: {recipe.cookingTime} minutes</p>
                <button
                  type="button"
                  className="btn btn-danger card-link"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
