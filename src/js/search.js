import SlimSelect from 'slim-select'
import _ from "lodash"
import { testyTreatsAPI } from "./tasty-treatsAPI";
import {addRecipes} from "./recipes.js";
import {Notify} from 'notiflix';
const searchSelectEl = document.querySelector('#search-key');
const timeSelectEl = document.querySelector('#time-key')
const areaSelectElement = document.querySelector('#area-key');
const ingredientsSelectElement = document.querySelector('#ingredients-key');
const resetFiltersEl = document.querySelector('.filter-reset')

const tastyTreatsAPI = new testyTreatsAPI()

let areaSlimSelect = undefined
let timeSlimSelect = undefined
let ingredientSlimSelect = undefined


tastyTreatsAPI.loadAreas()
  .then((res) => res.data)
  .then((res) => {
    for(let result in res){
      areaSelectElement.insertAdjacentHTML('beforeend',
        `
            <option value="${res[result].name}">${res[result].name}</option>
        `)
    }

    areaSlimSelect = new SlimSelect({
      select : areaSelectElement,
      settings : {
        showSearch : false,
        placeholderText: 'Region',
        allowDeselect: true,
        maxValuesShown: 6,
      }
    })
  })

ingredientSlimSelect =new SlimSelect({
  select : ingredientsSelectElement,
  settings : {
    showSearch : false,
    placeholderText: 'Product',
    allowDeselect: true,
    maxValuesShown: 6,
  },
  showContent: false,
})
tastyTreatsAPI.loadIngredients()
  .then(res => res.data)
  .then((res) => {
    const data = res.map((item) => {
      const optionElement = document.createElement('option');
      optionElement.value = item._id
      optionElement.textContent = item.name
      return optionElement
    });
    ingredientSlimSelect.setData([
      // Make sure placeholder is first value
      {text: '', placeholder: true},
      ...data
    ])
  })


timeSlimSelect = new SlimSelect({
  select : timeSelectEl,
  settings : {
    showSearch : false,
    placeholderText: '0 min',
    allowDeselect: true,
    maxValuesShown: 6,
  }
})





const recipesReq = async () =>{
  const tasty = new testyTreatsAPI()
  const categoryFilter = document.querySelector('.active_btn')

  tasty.time = timeSelectEl.value
  if (categoryFilter !== null){
    tasty.category = categoryFilter.textContent;
  }
  tasty.area = areaSelectElement.value
  tasty.ingredient = ingredientsSelectElement.value;
  // Add any further actions needed here
  tasty.title = searchSelectEl.value.trim()


  const res = await tasty.loadRecipes()
  if(res.data['results'].length > 0){
    addRecipes(res.data['results'])
  }
  else{
    Notify.failure('No recipes found');
  }
}

searchSelectEl.addEventListener('input', () =>{
  if(searchSelectEl.value.trim() != ''){
    document.querySelector('.icon-search').style.fill = '#9BB537'
  }
  else{
    document.querySelector('.icon-search').style.fill = '#05050580'
  }
})

searchSelectEl.addEventListener('change', _.debounce(() => {
  recipesReq()
}, 300, {leading : false, trailing : true}))

areaSelectElement.addEventListener('change', _.debounce(() => {
  recipesReq()
}, 300, {leading : false, trailing : true}))

ingredientsSelectElement.addEventListener('change', _.debounce(() => {
  recipesReq()
}, 300, {leading : false, trailing : true}))

timeSelectEl.addEventListener('change', _.debounce(() => {
  recipesReq()
}, 300, {leading : false, trailing : true}))

resetFiltersEl.addEventListener('click', () =>{
  document.querySelector('.icon-search').style.fill = '#05050580'
  areaSlimSelect.setSelected('')
  ingredientSlimSelect.setSelected('')
  timeSlimSelect.setSelected('')
  searchSelectEl.value = ''
})
