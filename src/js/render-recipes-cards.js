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
export default function renderCards(recipes) {
  return recipes
    .map(recipe => {
      return `
    <article id="${
      recipe._id
    }" class="recipe" style="background-image: linear-gradient(1deg, rgba(5, 5, 5, 0.60) 0%, rgba(5, 5, 5, 0.00) 100%), url(${
        recipe.thumb
      })">
      <button class="recipe-heart-btn favorite-heard-btn">
        <svg class="recipe-heart-icon favorite-heard-icon" width="22" height="22">
          <use href="/images/sprite.svg#icon-heart"></use>
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
                  <use href="/images/sprite.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  2
                )}" width="14" height="14">
                  <use href="/images/sprite.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  3
                )}" width="14" height="14">
                  <use href="/images/sprite.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  4
                )}" width="14" height="14">
                  <use href="/images/sprite.svg#icon-star"></use>
                </svg>
              </li>
              <li class="recipe-rating-star-item">
                <svg class="${fillingStar(
                  recipe.rating,
                  5
                )}" width="14" height="14">
                  <use href="/images/sprite.svg#icon-star"></use>
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
}
