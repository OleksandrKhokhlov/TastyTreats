import { Notify } from 'notiflix';
import { testyTreatsAPI } from './tasty-treatsAPI.js';
import { addRecipes } from './recipes.js';
import { pagination } from "./pagin";
let lastClickedMenuItem = null;

const cssLoaderRef = document.querySelector('span.loader')
async function fetchRecipesCategories() {
  const testy = new testyTreatsAPI();
  try {
    const response = await testy.loadCategories();
    return await response.data;
  } catch (error) {
    Notify.failure('Error fetching recipes');
    return [];
  }
}
let category_id = null
const ingredientsSelectElement = document.querySelector('#ingredients-key');
ingredientsSelectElement.addEventListener('change', () => {
  if (ingredientsSelectElement.value !== ''){
    category_id = ingredientsSelectElement.value;
  }
});
async function fetchRecipeDetails(recipeName) {
  getRecipesButton.classList.remove('btn-active');
  const testyDetails = new testyTreatsAPI();
  try {
    const timeFilter = document.querySelector(".time-label > div > div.ss-values > div")
    const areaFilter = document.querySelector(".area-label > div > div.ss-values > div")
    testyDetails.category = recipeName;
    testyDetails.ingredient = category_id;
    testyDetails.time = timeFilter.textContent
    testyDetails.area = areaFilter.textContent
    const response = await testyDetails.loadRecipes();
    cssLoaderRef.classList.remove('visually-hidden')
    addRecipes(response.data['results']);
    pagination.movePageTo(1);
    cssLoaderRef.classList.add('visually-hidden')
    // return await response.data;
  } catch (error) {
    Notify.failure('Error fetching recipe details');
    return null;
  }
}
export async function fetchAllRecipes() {
  getRecipesButton.classList.add('btn-active');
  try {
    const testy = new testyTreatsAPI();
    const timeFilter = document.querySelector(".time-label > div > div.ss-values > div")
    const areaFilter = document.querySelector(".area-label > div > div.ss-values > div")
    if (timeFilter !== null || areaFilter !== null){
      testy.ingredient = category_id;
      testy.time = timeFilter.textContent
      testy.area = areaFilter.textContent
    }
    cssLoaderRef.classList.remove('visually-hidden')
    const response = await testy.loadRecipes();
    addRecipes(response.data['results']);
    pagination.movePageTo(1);
    cssLoaderRef.classList.add('visually-hidden')
    // return await response.data;
  } catch (error) {
    Notify.failure('Error fetching recipe details');
    return null;
  }
}
async function createScrollableMenu() {
  const scrollableMenu = document.querySelector('.scrollableMenu');
  const recipes = await fetchRecipesCategories();

  if (recipes.length === 0) {
    Notify.failure('Error fetching recipes');
    return;
  }

  const menuItems = recipes.map(recipe => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.textContent = recipe.name;
    return menuItem;
  });

  scrollableMenu.append(...menuItems);
}
async function getAllRecipeDetails() {
  if (lastClickedMenuItem) {
    lastClickedMenuItem.classList.remove('active_btn');
  }
  // тут буде заповнення 1 сторінки діву з картками рецептів
  return await fetchAllRecipes();
}

const getRecipesButton = document.createElement('button');
getRecipesButton.classList.add('getRecipesButton');
getRecipesButton.textContent = 'All categories';

const scrollContainer = document.createElement('div');
const scrollableMenu = document.createElement('div');
const categoriesFilter = document.querySelector('.categories-filter');
// categoriesFilter.classList.add('container');
scrollContainer.classList.add('scrollContainer');
scrollableMenu.classList.add('scrollableMenu');

categoriesFilter.appendChild(getRecipesButton);
categoriesFilter.appendChild(scrollContainer);
scrollContainer.appendChild(scrollableMenu);

scrollableMenu.addEventListener('click', async event => {
  const menuItem = event.target;
  if (menuItem.classList.contains('menu-item')) {
    if (lastClickedMenuItem) {
      lastClickedMenuItem.classList.remove('active_btn');
    }
    const recipeName = menuItem.textContent;
    menuItem.classList.add('active_btn');
    lastClickedMenuItem = menuItem;
    const recipeDetails = await fetchRecipeDetails(recipeName);
    if (recipeDetails) {
      return recipeDetails;
    }
  } else {
    Notify.failure('Failed to fetch recipe details');
  }
});

getRecipesButton.addEventListener('click', getAllRecipeDetails);
fetchAllRecipes();
createScrollableMenu();
