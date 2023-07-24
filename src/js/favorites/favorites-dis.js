import refs from './refs';
// import { getFromLocalStorage } from '.';
import { countPage, groupArrayIntoChunks } from './counter';
import { pagination } from '../pagin';
import { renderingFavRec } from './render-favorites';

export function displayFavorites(pageSet = 1) {
  const data = getFromLocalStorage('favorites-data');
  refs.allCategoriesBtn.style.display = data && data.length ? 'block' : 'none';

  if (!data || data.length === 0) {
    refs.favoritesMessError.classList.remove('visually-hidden');
    refs.allCategoriesBtn.classList.add('visually-hidden');
    if (window.innerWidth < 768)
      refs.heroFavorites.classList.add('visually-hidden');
    return;
  }

  const perPage = countPage();
  const objData = groupArrayIntoChunks(data, perPage);
  const totalPages = Object.keys(objData).length;

  refs.pagElement.style.display = totalPages > 1 ? 'block' : 'none';
  pagination(pageSet, perPage, totalPages, displayFavorites);

  const listMarkup = objData[pageSet]
    .map(({ title, description, preview, rating, id, category }) =>
      renderingFavRec(title, description, preview, rating, id, category)
    )
    .join('');

  refs.btnListFavorites.innerHTML = listMarkup;
  refs.favoritesMessError.classList.add('visually-hidden');
}
