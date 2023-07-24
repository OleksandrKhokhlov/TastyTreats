import renderCards from "./render-recipes-cards";
import {testyTreatsAPI} from "./tasty-treatsAPI.js";
import { pagination } from "./pagin";

const recipesEl = document.querySelector('.recipes-block');

export function addRecipes(recipes) {
  if(recipesEl.children.length !== 0) {
    destroyRecipesBlock();
  }
  recipesEl.insertAdjacentHTML('beforeend', renderCards(recipes));
}
export function loadMore() {
  pagination.on('afterMove', async eventData => {
    const testy = new testyTreatsAPI();
    try {
      testy.page = eventData.page;
      const response = await testy.loadRecipes();
      addRecipes(response.data.results);
      return await response.data;
    }
    catch(error) {
      console.log(error);
    }
  });
}
export function loadMoreDetails(name) {
  pagination.on('afterMove', async eventData => {
    const testy = new testyTreatsAPI();
    try {
      testy.page = eventData.page;
      testy.category = name;
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