import renderCards from "./render-recipes-cards";
import {testyTreatsAPI} from "./tasty-treatsAPI.js";
import { pagination } from "./pagin";
import {favoritesJSON, onHeartBtnClick } from "./local-storage";

const recipesEl = document.querySelector('.recipes-block');

export function addRecipes(recipes) {
  if(recipesEl.children.length !== 0) {
    destroyRecipesBlock();
  }

  recipesEl.insertAdjacentHTML('beforeend', renderCards(recipes));
  fillingHeartThatWasAddedToFavorites();
  
}
export function loadMoreRecipes() {
  pagination.on('afterMove', async eventData => {
    const categoryFilter = document.querySelector('.active_btn')
    const testy = new testyTreatsAPI();
    try {
      testy.page = eventData.page;
      if (categoryFilter !== null){
        testy.category = categoryFilter.textContent;
      }
      const response = await testy.loadRecipes();
      addRecipes(response.data.results);
      return await response.data;
    }
    catch(error) {
      console.log(error);
    }
});
}
function destroyRecipesBlock() {
  [...recipesEl.children].forEach(recipe => {
    recipe.remove();
  });
}
export function fillingHeartThatWasAddedToFavorites() {
  try {
    const favoritesFromLocalStorage = JSON.parse(favoritesJSON);
    if(favoritesFromLocalStorage === null) {
      return;
    }
    favoritesFromLocalStorage.map(favRecipe=> {
    const articleEl = document.querySelector(`article[id="${favRecipe._id}"]`);
    const recipeHeartIconEl = articleEl.querySelector('.recipe-heart-icon');
    recipeHeartIconEl.classList.add('recipe-heart-icon-in-favorites');
    })
  }
  catch(error) {
    console.log(error);
  }
}
loadMoreRecipes();
recipesEl.addEventListener('click', onHeartBtnClick);