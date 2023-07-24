// import { getFromLocalStorage } from '.';
import refs from './refs';

export function renderCategories(category) {
  return `<button class="favorites-btn">${category}</button>`;
}

export function updateCategoryList(target) {
  const currentRec = target.closest('div.recipe-item').dataset.category;
  const storageItems = getFromLocalStorage('favorites-data');
  const isCategoryLocal = storageItems.find(el => el.category === currentRec);
  const isCategoryRendered = [...refs.categoriesFavorites.children].find(
    el => el.textContent === currentRec
  );

  if (!isCategoryLocal && isCategoryRendered) isCategoryRendered.remove();
  else if (isCategoryLocal && !isCategoryRendered)
    refs.categoriesFavorites.insertAdjacentHTML(
      'beforeend',
      renderCategories(currentRec)
    );

  refs.allCategoriesBtn.style.display =
    storageItems && storageItems.length ? 'block' : 'none';
}
