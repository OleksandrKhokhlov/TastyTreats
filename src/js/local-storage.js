import { testyTreatsAPI } from "./tasty-treatsAPI";
import { Notify } from 'notiflix';

export const favoritesJSON = localStorage.getItem("favorites");
let recipesThatAddedToFavorites;
let wasDeleted = false;

if (favoritesJSON) {
  recipesThatAddedToFavorites = JSON.parse(favoritesJSON);
} 
else {
  recipesThatAddedToFavorites = []; 
}

export async function onHeartBtnClick(e) {
  const recipeHeartBtnEl = e.target.closest('.recipe-heart-btn');

  if (!recipeHeartBtnEl) {
    return;
  };
  const wasClicked = recipeHeartBtnEl.firstElementChild.classList.toggle('recipe-heart-icon-in-favorites');
  const recipeId = recipeHeartBtnEl.closest('article').getAttribute("id");

  const recipesFavorit = await recipesInFavorites(recipeId);
  if(!wasClicked) {
    deleteRecipeFromFavorites(recipeId);
    return;
  }
  wasDeleted = false;
  
  if(!wasDeleted) {
    addRecipeToFavorites(recipesFavorit);
  }
}
export async function onAddToFavoritesBtnClick(e) {

  const recipeId = e.target.closest('.modal_recipe').getAttribute("id");
  const articleWithId = document.querySelector(`article[id="${recipeId}"]`);
  const recipeHeartBtn = articleWithId.querySelector('.recipe-heart-btn');
  const wasClicked = recipeHeartBtn.firstElementChild.classList.toggle('recipe-heart-icon-in-favorites');

  const recipesFavorit = await recipesInFavorites(recipeId);
  if(!wasClicked) {
    deleteRecipeFromFavorites(recipeId);
    Notify.init({
      width: '300px',
      position: 'center-center',
    });
    Notify.info('The recipe has been removed from favorites');
    return;
  }
  wasDeleted = false;
  
  if(!wasDeleted) {
    addRecipeToFavorites(recipesFavorit);
    Notify.init({
      width: '300px',
      position: 'center-center',
    });
    Notify.success('The recipe has been added to favorites');
  }
}
export function deleteRecipeFromFavorites(recipeId) {
  recipesThatAddedToFavorites = recipesThatAddedToFavorites.filter((recipe) => recipe._id !== recipeId);
  localStorage.setItem("favorites", JSON.stringify(recipesThatAddedToFavorites));
  wasDeleted = true;
}
export function addRecipeToFavorites(recipesFavorit) {
  recipesThatAddedToFavorites.push(recipesFavorit);
    localStorage.setItem("favorites", JSON.stringify(recipesThatAddedToFavorites));
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
  