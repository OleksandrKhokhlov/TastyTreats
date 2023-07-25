
import { testyTreatsAPI } from "./tasty-treatsAPI";

const openSeeBtn = document.querySelector('.recipe-btn');
const closeSeeBtn =  document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal-reciepe]');
const nameRecipe = document.querySelector('.name-reciepe')
const instructEl = document.querySelector('.instructions');
const ratingEl = document.querySelector('.rating');
const timeEl=document.querySelector('.modal-time');
const starRatingEl = document.querySelector('.icon-star')
const mediaEl = document.querySelector('.media');
const tagsEl = document.querySelector('.tags');
const ingrEl = document.querySelector('.ingredients');


openSeeBtn.addEventListener('click', toggleModal);
closeSeeBtn.addEventListener('click', toggleModal);

function toggleModal() {
 modal.classList.toggle('visually-hidden');
getRecipeCard('6462a8f74c3d0ddd28897fba')
}

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';


async function loadRecipesById(id) {
  const resp = await fetch(
    `${BASE_URL}/${id}`
  );
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.json();
}


async function getRecipeCard(id) {
  // const testy = new testyTreatsAPI();
    try {
      const recipe = await loadRecipesById(id);
      console.log(recipe);
   nameRecipe.textContent = recipe.title;
    if (recipe.rating > 5) {
        recipe.rating = 5;
      }
    ratingEl.textContent = recipe.rating;
    timeEl.textContent = `${recipe.time} min`;
    instructEl.textContent =recipe.instructions;
    // starsRecipe(recipe);
tagsEl.innerHTML = getTags(recipe.tags);
ingrEl.innerHTML = getIngredients(recipe.ingredients);
mediaEl.innerHTML = getMedia(recipe.youtube, recipe.thumb, recipe.title);
  } catch (error) {
    console.log(error)
  }
  
}

function getMedia(youtube, image, alt) {
  if (!youtube) {
    return `<img class="image" src="${image}" alt="${alt}" width="295" height="295">`;
  } else {
    return `<iframe
    id="video-recipe"
    src="${youtube.replace(
            'watch?v=',
            'embed/'
          )}"
          width="295"
          height="295"
        ></iframe>`
  }
};

function getTags(tags) {
  if(!tags){
    return;
  }
  let markup = '';
      for (const tag of tags) {
         markup += `<li class="recipe-tag">${tag}</li>`; 
      }
       return markup;  
}

function getIngredients(ingredients) {
  let markup = '';
  for (const ingredient of ingredients) {
    markup += `<li class="recipe-ing">
    <p class="recipe-ing-name">${ingredient.name}</p>
    <span class="recipe-ing-measure">${ingredient.measure}</span>
    </li>`; 
  }
  return markup;  
}


// function starsRecipe(recipe) {
//     for (let i = 0; i < 5; i++) {
//       if (i < recipe.rating) {
//         starRatingEl[i].classList.add('icon-star');
//       } else {
//         starRatingEl[i].classList.remove('icon-star');
//       }
//     }
//   }

