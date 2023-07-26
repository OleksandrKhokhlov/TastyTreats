// import { pagination } from './pagin';
import renderCards from './render-recipes-cards';
// import { deleteRecipeFromFavorites } from './local-storage';

const listFavorites = document.querySelector('.favorites-list');
const favoritesMessError = document.querySelector('.favorites-error');
const categoriesFavorites = document.querySelector('.favorites-categories');
const heroFavorites = document.querySelector('.favorites-hero');
// const deleteRecipe = document.querySelector('.favorite-heard-btn');

//localStorage
const recipesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));
// console.log(recipesFromLocalStorage);
// let favRecipesLocalStorage = recipesFromLocalStorage;

function renderCardsFavorites() {
  listFavorites.insertAdjacentHTML(
    'beforeend',
    renderCards(recipesFromLocalStorage)
  );
  if (recipesFromLocalStorage.length === 0) {
    favoritesMessError.classList.remove('visually-hidden');
    return;
  }
  if (window.innerWidth < 767) {
    heroFavorites.classList.add('visually-hidden');
    return;
  }
}
renderCardsFavorites();

//категорії з localStorage
function createAllCategireisList() {
  const AllCategireisListItem = recipesFromLocalStorage
    .map(recipe => {
      return `<button class="favorites-btn fav-btn is-active" name="main-cat-btn">
                     All categories
              </button>
              <button class="favorites-btn btn-categori is-active"
                  type="button">${recipe.category}
              </button>
                `;
    })
    .join('');

  categoriesFavorites.insertAdjacentHTML('beforeend', AllCategireisListItem);
}
createAllCategireisList();

//сортування по категоріях
