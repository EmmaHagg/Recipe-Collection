import React from "react";
import style from "./recipes.module.css";

const Recipes = ({ title, calories, image, ingredients}) => {
  
  // const [ingredients, Setrecipes] = useState('');
  
  // const addItem = e =>{
  //   Setrecipes(e.target.value)
    
  // }

  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      {/* <button  value={ingredients} onSubmit={addItem} className={style.button}>Add recipe to my list</button> */}
      <ol>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <p> Calories : {calories}</p>
      <img className={style.image} src={image} alt="" />
      
    </div>
  );
};
export default Recipes;
