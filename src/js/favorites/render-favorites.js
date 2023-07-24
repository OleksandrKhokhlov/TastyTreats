import sprite from '../../images/sprite.svg';
// import renderCards from '../render-recipes-cards';

function getRating(rating) {
  const roundedRating = rating > 5 ? 5 : rating;
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  return `
    <ul class="stars-list">
      ${stars
        .map(
          star => `
            <li class="${
              star <= roundedRating ? 'star-rated-item' : 'star-item'
            }">
              <svg class="star-icon" width="18" height="18">
                <use href="${sprite}#icon-star"></use>
              </svg>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

function checkForFav(id) {
  const storage = localStorage.getItem('favorites-data');
  const data = JSON.parse(storage);
  return storage && data.find(el => el.id === id) ? 'active' : '';
}

// renderCards(recipes);

export function renderingFavRec(
  title,
  description,
  preview,
  rating,
  id,
  category
) {
  const infoRecipe = {
    title,
    description: description.replace("'", ''),
    preview,
    rating,
    id,
    category,
  };

  const fixedRating = Math.min(rating, 5).toFixed(1);

  return `
    <div data-category="${category}" class="rec-item" 
      style="background: url(${preview});">
      <div class="upper-part">
        <button type="button" class="heart-btn ${checkForFav(
          id
        )}" data-info="${JSON.stringify(infoRecipe)}" name="favorite">
          <svg class="icon-heart" width="22" height="22">
            <use href="${sprite}#icon-heart"></use>
          </svg>
        </button>
        <h2 class="rec-card-title title-cut">${title}</h2>
        <p class="rec-card-desc desc-cut">${description}</p>
        <div class="rec-rate">
          <p class="rate">${fixedRating}</p>
          ${getRating(fixedRating)}
          <button type="button" name="details" class="rec-btn-open rec-btn" data-id="${id}">See recipe</button>
        </div>
      </div>
    </div>
  `;
}

