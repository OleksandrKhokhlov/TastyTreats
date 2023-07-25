import { testyTreatsAPI } from "./tasty-treatsAPI";
const recipesThatAddeToFavorites = [];

export async function onHeartBtnClick(e) {
  const recipeHeartBtnEl = e.target.closest('.recipe-heart-btn');
  if (!recipeHeartBtnEl) {
    return;
  };
  const wasClicked = recipeHeartBtnEl.firstElementChild.classList.toggle('recipe-heart-icon-in-favorites');
  const recipeId = recipeHeartBtnEl.closest('article').getAttribute("id");

  const recipesfavorit = await recipesInFavorites(recipeId);
  // if(!wasClicked) {
    
  // }
  recipesThatAddeToFavorites.push(recipesfavorit);


  localStorage.setItem("favorites", JSON.stringify(recipesThatAddeToFavorites));
}
 async function recipesInFavorites(idRecipe) {
  const testy = new testyTreatsAPI();
    try {
      testy.id = idRecipe;
      const response = await testy.loadRecipesById();
      return await response.data;
    }
    catch(error) {
      console.log(error);
    }
  }
  