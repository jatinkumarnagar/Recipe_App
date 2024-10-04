import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

const SaveRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (userID) {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/saveRecipes/${userID}`
          );
          console.log(response.data); // Log the response data
          setSavedRecipes(response.data.savedRecipes || []);
        } catch (error) {
          console.error("Error fetching saved recipes:", error);
          setError("Failed to fetch saved recipes.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>;
  }

  return (
    <div>
      <h2 className="text-center">Saved Recipes</h2>
      <ul className="list-unstyled container-fluid d-flex flex-wrap">
        {savedRecipes.length === 0 ? (
          <p className="text-center">No saved recipes found.</p>
        ) : (
          savedRecipes.map((recipe) => (
            <li className="m-3" key={recipe._id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={recipe.imageUrl}
                  className="card-img-top"
                  alt={recipe.name}
                />
                <div className="card-body">
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
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SaveRecipes;
