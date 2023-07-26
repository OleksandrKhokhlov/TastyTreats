import { testyTreatsAPI } from "./tasty-treatsAPI";

const backdropRec = document.querySelector('.backdrop-see-recipe');
const openSeeBtn = document.querySelector('.recipe-btn');
const closeSeeBtn =  document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal-recipe]');
const nameRecipe = document.querySelector('.name-recipe')
const instructEl = document.querySelector('.instructions');
const ratingEl = document.querySelector('.rating');
const timeEl=document.querySelector('.modal-time');
const starRatingEl = document.querySelector('.icon-star')
const mediaEl = document.querySelector('.media');
const tagsEl = document.querySelector('.tags');
const ingrEl = document.querySelector('.ingredients');
const cardBlockEl = document.querySelector('.recipes-block')


cardBlockEl.addEventListener('click', onCard);
// openSeeBtn.addEventListener('click', onCard);
closeSeeBtn.addEventListener('click', closeModal);

function closeBackdrop(e) {
  if (e.target === modal) {
     closeModal()
   }
}


function keyDown(e) {
  if (e.key === 'Escape') {
    closeModal();
   
  }
}

function closeModal() {
  modal.classList.toggle('visually-hidden');
  document.removeEventListener('keydown', keyDown);
  modal.removeEventListener('click', closeBackdrop);
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
  
    try {
      const recipe = await loadRecipesById(id); 
      mediaEl.innerHTML = getMedia(recipe.youtube, recipe.thumb, recipe.title);
      nameRecipe.textContent = recipe.title;
       if (recipe.rating > 5) {
        recipe.rating = 5;
     }
    ratingEl.textContent = recipe.rating;
    timeEl.textContent = `${recipe.time} min`;
    ingrEl.innerHTML =  getIngredients(recipe.ingredients);
    tagsEl.innerHTML = getTags(recipe.tags);
    instructEl.textContent =recipe.instructions;
    // goldStars(recipe);
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
          width="100%"
          height="100%"
          frameborder = "0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
        ></iframe>`
  }
};

function getTags(tags) {
  if(!tags){
    return;
  }
  let markup = '';
      for (const tag of tags) {
         markup += `<li class="recipe-tag">#${tag}</li>`; 
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


function goldStars(recipe) {
    for (let i = 0; i < 5; i++) {
      if (i < recipe.rating) {
        starRatingEl[i].classList.add('icon-star-gold');
      } else {
        starRatingEl[i].classList.remove('icon-star-gold');
      }
    }
}

function onCard(e) {
    if (e.target.hasAttribute('id')) 
    openModal(e.target);
}
   
function openModal(target) {
    getRecipeCard(target.getAttribute('id'));
  modal.classList.toggle('visually-hidden');
  document.addEventListener('keydown', keyDown);
  backdropRec.addEventListener('click', closeBackdrop);
}
