import React, {useEffect, useState} from "react";
import "./recipe.css";
import Recipe from "./Recipes";

const GetRecipe = () => {
  /* 
  Behövs för att komma åt APIet från 
  https://developer.edamam.com/
  */
  const App_ID = "66900627";
  const App_KEY = "e25e62557fc73966f40f3af3d7ee9bf2";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



//Tar en arrow function som en parameter
/* 
Bara när counter uppdateras körs denna function, 
Lämnar vi arrayen tom körds den bara en gång och det är när applikationen stratar.
*/
  useEffect(()=>{
    getRecipies()
  }, [query])

  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_KEY}`
      );

    //response.json formaterar datat så att vi kan jobba med det
    const data = await response.json();
    //Uppdaterar vårt state
    setRecipes(data.hits);
  }

  const upDateSearch = e =>{
    setSearch(e.target.value)
    
  }
  const getSearch = e =>{
    //Stoppar sidan från att ladda om
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className="recipe-App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search}  onChange={upDateSearch} />
        <button className="search-button" type="submit">search</button>
      </form>
   <div className="recipes">
      {recipes.map(recipe => (
        //title i Recipe är en prop
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          //Array = kommer behöva loopa igenom den
          ingredients={recipe.recipe.ingredients}
          /> 
         
      ))}
     
      </div>
  
    </div>
  );
};
export default  GetRecipe ;
