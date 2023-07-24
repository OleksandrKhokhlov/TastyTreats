import { testyTreatsAPI } from '../tasty-treatsAPI';
import refs from './refs';
// import { getFromLocalStorage } from '../favorite/localStorageUtils';
import { handleCategoryFilter } from './categotyFilter';
import { displayFavorites } from './favorites-dis';
import { updateCategoryList, renderCategories } from './updateCategory.js';

const recipeApiSeriсe = new testyTreatsAPI();

recipeApiSeriсe.getRecipe().then(response => {
  const arr = response.results;

  const FAV_DATA = 'favorites-data';
  const toStorage = [];

  for (let i = 0; i < 6; i++) {
    const { _id, title, category, rating, preview, description } = arr[i];
    for (let j = 0; j < 5; j++) {
      toStorage.push({
        _id,
        title,
        category,
        rating,
        preview,
        description,
      });
    }
  }

  localStorage.setItem(FAV_DATA, JSON.stringify(toStorage));
});

function onFavoritesReload() {
  const categoryMarkup = createCategoryList();
  const allCatBtn = `<button class="favorites-btn is-active" name="main-cat-btn">All categories</button>`;

  const data = getFromLocalStorage('favorites-data');
  refs.btnListFavorites.innerHTML = '';
  refs.categoriesFavorites.innerHTML =
    data && data.length ? `${allCatBtn}${categoryMarkup}` : '';
  displayFavorites();
}

function createCategoryList() {
  const storage = localStorage.getItem('favorites-data');
  const data = JSON.parse(storage);

  if (!data || data.length === 0) return '';

  const uniqueCategories = data
    .flatMap(recipe => recipe.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  return uniqueCategories.reduce(
    (categoryMarkup, category) => categoryMarkup + renderCategories(category),
    ''
  );
}

function removeFavorite(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);
  const storage = JSON.parse(localStorage.getItem('favorites-data'));
  localStorage.setItem(
    'favorites-data',
    JSON.stringify(storage.filter(el => el.id !== recipeInfo.id))
  );
  onFavoritesReload();
}

function handleRecipeButtonEvent({ target }) {
  if (!target.closest('button')) return;
  const currentBtn = target.closest('button');

  if (currentBtn.name === 'favorites-data') {
    removeFavorite(currentBtn);
    updateCategoryList(target);
  }
  if (currentBtn.name === 'details') {
    console.log('modal');
  }
}

refs.renderedFavCard.addEventListener('click', handleRecipeButtonEvent);
refs.categoriesFavorites.addEventListener('click', handleCategoryFilter);
document.addEventListener('DOMContentLoaded', onFavoritesReload);
