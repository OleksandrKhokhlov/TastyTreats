import axios from "axios";
import {Notify} from "notiflix";

let lastClickedMenuItem = null;
async function fetchRecipesCategories() {
  try {
    const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/categories');
    return await response.data;
  } catch (error) {
    Notify.failure('Error fetching recipes');
    return [];
  }
}
async function fetchRecipeDetails(recipeName, page=1) {
  const windowWidth = screen.width;
  try {
    if (windowWidth <= 320) {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?category=${recipeName}&page=${page}&limit=6`);
      return await response.data;
    }
    else if (windowWidth <= 768) {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?category=${recipeName}&page=${page}&limit=8`);
      return await response.data;
    }
    else {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?category=${recipeName}&page=${page}&limit=9`);
      return await response.data;
    }
  } catch (error) {
    Notify.failure('Error fetching recipe details');
    return null;
  }
}
async function fetchAllRecipes(page = 1) {
  const windowWidth = screen.width;
  try {
    if (windowWidth <= 320) {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}&limit=6`);
      return await response.data;
    }
    if (windowWidth <= 768) {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}&limit=8`);
      return await response.data;
    }
    else {
      const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}&limit=9`);
      return await response.data;
    }
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

  recipes.forEach((recipe) => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.textContent = recipe.name;
    scrollableMenu.appendChild(menuItem);
  });
}
async function getAllRecipeDetails() {
  if (lastClickedMenuItem) {
    lastClickedMenuItem.style.color = 'rgba(5, 5, 5, 0.3)';
  }
  const recipes = await fetchAllRecipes();

  if (recipes.length === 0) {
    Notify.failure('No recipes available');
    return;
  }

  else {
    return recipes
  }
}

const getRecipesButton = document.createElement('button');
getRecipesButton.classList.add('getRecipesButton');
getRecipesButton.textContent = 'All categories';

const scrollContainer = document.createElement('div');
const scrollableMenu = document.createElement('div');
const categoriesFilter = document.querySelector('.categories-filter');
categoriesFilter.classList.add('container')
scrollContainer.classList.add('scrollContainer')
scrollableMenu.classList.add('scrollableMenu')

categoriesFilter.appendChild(getRecipesButton);
categoriesFilter.appendChild(scrollContainer);
scrollContainer.appendChild(scrollableMenu);

scrollableMenu.addEventListener('click', async (event) => {
  const menuItem = event.target;
  if (menuItem.classList.contains('menu-item')) {
    if (lastClickedMenuItem) {
      lastClickedMenuItem.style.color = 'rgba(5, 5, 5, 0.3)';
    }
    const recipeName = menuItem.textContent;
    menuItem.style.color = '#9BB537'
    lastClickedMenuItem = menuItem
    const recipeDetails = await fetchRecipeDetails(recipeName);
    if (recipeDetails) {
      return recipeDetails
    }
  } else {
    Notify.failure('Failed to fetch recipe details');
  }
});

getRecipesButton.addEventListener('click', getAllRecipeDetails);
createScrollableMenu()
