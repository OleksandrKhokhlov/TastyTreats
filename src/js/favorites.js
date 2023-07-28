import {
  onHeartBtnClick,
  fillingHeartThatWasAddedToFavorites,
} from './local-storage';

const listFavorites = document.querySelector('.favorites-list');
const favoritesMessError = document.querySelector('.favorites-error');
const categoriesFavorites = document.querySelector('.favorites-categories');
const heroFavorites = document.querySelector('.favorites-hero');

// show current page ------
document.querySelector('.nav-link-home').classList.remove('current');
document.querySelector('.nav-link-fav').classList.add('current');
//------------------------

listFavorites.addEventListener('click', onHeartBtnClick);

//localStorage
const recipesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'));

if (recipesFromLocalStorage === null) {
  favoritesMessError.classList.remove('visually-hidden');
  categoriesFavorites.classList.add('visually-hidden');
  heroFavorites.classList.add('visually-hidden');
}

//Категорії з localStorage
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

//Рецепти з localStorage
function doNumberRounding(rating) {
  const tenthOfRating = (
    rating.toFixed(1) - Number.parseInt(rating.toFixed(1))
  ).toFixed(1);
  if (tenthOfRating === (0.0).toFixed(1)) {
    return Math.round(rating);
  }
  return rating.toFixed(1);
}
function fillingStar(rating, numStar) {
  if (Math.round(rating) >= numStar) {
    return 'filled-star-icon';
  } else {
    return 'no-filled-star-icon';
  }
}
function renderCardsFavorites() {
  const AllCategireisListItem = recipesFromLocalStorage
    .map(recipe => {
      return `
    <article id="${
      recipe._id
    }" class="recipe recipe-favorites" style="background-image: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${
        recipe.thumb
      })">
      <button class="recipe-heart-btn favorite-heard-btn">
        <svg class="recipe-heart-icon" width="22" height="22">
          <use href="/project-food1728/assets/sprite-27867edf.svg#icon-heart"></use>
        <svg>
      </button>
      <div class="recipe-info">
        <h3 class="recipe-name">${recipe.title}</h3>
        <p class="recipe-desc">${recipe.description}</p>
        <div class="recipe-rating-and-btn-wrapper">
          <div class="recipe-rating-wrapper">
            <span class="recipe-rating-number">${doNumberRounding(
              recipe.rating
            )}</span>
            <ul class="recipe-rating-stars">
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  1
                )}" width="14" height="14">
                  <use href="/project-food1728/assets/sprite-27867edf.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  2
                )}" width="14" height="14">
                  <use href="/project-food1728/assets/sprite-27867edf.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  3
                )}" width="14" height="14">
                  <use href="/project-food1728/assets/sprite-27867edf.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  4
                )}" width="14" height="14">
                  <use href="/project-food1728/assets/sprite-27867edf.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  5
                )}" width="14" height="14">
                  <use href="/project-food1728/assets/sprite-27867edf.svg#icon-star"></use>
                </svg>
              </li>
            </ul>
          </div>
          <button class="recipe-btn" type="button">See recipe</button>
        </div>
      </div>
    </article>
    `;
    })
    .join(' ');

  listFavorites.insertAdjacentHTML('beforeend', AllCategireisListItem);

  if (!recipesFromLocalStorage || recipesFromLocalStorage.length === 0) {
    favoritesMessError.classList.remove('visually-hidden');
    categoriesFavorites.classList.add('visually-hidden');
    if (window.innerWidth < 768) {
      heroFavorites.classList.add('visually-hidden');
      favoritesMessError.classList.add('favorites-error-js');
    }
    return;
  }
  fillingHeartThatWasAddedToFavorites();
}

renderCardsFavorites();
