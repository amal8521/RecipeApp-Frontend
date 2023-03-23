import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  // initialize an object using useState hook
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    // attribute name and value is passed to here
    const { name, value } = event.target;
    // attribute name is key and input value is value
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    // create a copy of ingredients
    const ingredients = [...recipe.ingredients];
    // set value to index
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    // add new ingredient to ingredients array
    const ingredients = [...recipe.ingredients, ""];
    // add updated ingredients array to setRecipe
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { headers: { authorization: cookies.access_token } },
        recipe
      );
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2> Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name"> name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
          <label htmlFor="ingredients"> Ingredients</label>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
          <button type="button" onClick={addIngredient}>
            {" "}
            Add Ingredient
          </button>
          <label htmlFor="instructions"> Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageUrl"> Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            onChange={handleChange}
          />
          <label htmlFor="cookingTime"> Cooking Time</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleChange}
          />
        </div>
        <button type="submit"> Create Recipe</button>
      </form>
    </div>
  );
};
