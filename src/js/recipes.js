import renderCards from './render-recipes-cards';
import { testyTreatsAPI } from './tasty-treatsAPI.js';
import { pagination } from './pagin';
import {
  onHeartBtnClick,
  fillingHeartThatWasAddedToFavorites,
} from './local-storage';

const recipesEl = document.querySelector('.recipes-block');
const cssLoaderRef = document.querySelector('span.loader');
const paginRef = document.querySelector('#pagination');

export function addRecipes(recipes) {
  if (recipesEl.children.length !== 0) {
    destroyRecipesBlock();
  }

  recipesEl.insertAdjacentHTML('beforeend', renderCards(recipes));
  fillingHeartThatWasAddedToFavorites();
}

let category_id = null;
const ingredientsSelectElement = document.querySelector('#ingredients-key');

ingredientsSelectElement.addEventListener('change', () => {
  if (ingredientsSelectElement.value !== '') {
    category_id = ingredientsSelectElement.value;
  }
  else{
    category_id = null
  }
});

export function loadMoreRecipes() {
  pagination.on('afterMove', async eventData => {
    const categoryFilter = document.querySelector('.active_btn');
    const timeFilter = document.querySelector(
      '.time-label > div > div.ss-values > div'
    );
    const areaFilter = document.querySelector(
      '.area-label > div > div.ss-values > div'
    );
    const testy = new testyTreatsAPI();
    try {
      testy.title = searchSelectEl.value.trim();
      testy.ingredient = category_id;
      testy.time = timeFilter.textContent;
      testy.area = areaFilter.textContent;
      testy.page = eventData.page;
      if (categoryFilter !== null) {
        testy.category = categoryFilter.textContent;
      }
      cssLoaderRef.classList.remove('visually-hidden');
      paginRef.classList.remove('visually-hidden');
      const response = await testy.loadRecipes();
      if (response.data.totalPages === 1) {
        paginRef.classList.add('visually-hidden');
      }
      cssLoaderRef.classList.add('visually-hidden');
      pagination._options.totalItems = response.data.totalPages;
      addRecipes(response.data.results);
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  });
}
export function destroyRecipesBlock() {
  [...recipesEl.children].forEach(recipe => {
    recipe.remove();
  });
}

loadMoreRecipes();
recipesEl.addEventListener('click', onHeartBtnClick);
