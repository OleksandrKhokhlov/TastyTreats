import { pagination } from './pagin';
import renderCards from './render-recipes-cards';

const listFavorites = document.querySelector('.favorites-list');
const favoritesMessError = document.querySelector('.favorites-error');
const categoriesFavorites = document.querySelector('.favorites-categories');
const heroFavorites = document.querySelector('.favorites-hero');

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
    categoriesFavorites.classList.add('visually-hidden');
    if (window.innerWidth < 767) heroFavorites.classList.add('visually-hidden');
    return;
  }
}
renderCardsFavorites();

//категорії з localStorage
function createAllCategireisList() {
  const AllCategireisListItem = recipesFromLocalStorage
    .map(recipe => {
      return `<button class="favorites-btn btn-categori is-active"
                  type="button">${recipe.category}
                </button>
                `;
    })
    .join('');

  categoriesFavorites.insertAdjacentHTML('beforeend', AllCategireisListItem);
}
createAllCategireisList();

//сортування по категоріях

