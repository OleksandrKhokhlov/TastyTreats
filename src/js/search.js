import axios, { formToJSON } from "axios";


var _ = require("lodash")

const selectedCategoryEL = document.querySelector('.menu-item .active')

const formEl = document.querySelector('.search-filters');
const searchSelectEl = document.querySelector('#search-key');
const timeSelectEl = document.querySelector('#time-key')
const areaSelectElement = document.querySelector('#area-key');
const ingredientsSelectElement = document.querySelector('#ingredients-key');

const getAreaKeys = async () =>{
    const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/areas')
    
    const result = await response.data
    return result
}

const getIngredientsKeys = async () =>{
    const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/ingredients')
    
    const result = await response.data
    return result
}

const areaKeys = getAreaKeys()
.then((results) => {
    for(let result in results){
        areaSelectElement.insertAdjacentHTML('beforeend',
        `
            <option value="${results[result].name.toLowerCase()}">${results[result].name}</option>
        `)
    }
})

const ingredientsKeys = getIngredientsKeys()
.then((results) => {
    for(let result in results){
        ingredientsSelectElement.insertAdjacentHTML('beforeend',
        `
            <option value="${results[result].name.toLowerCase()}">${results[result].name}</option>
        `)
    }
})

const recipesReq = async () =>{
    const response = await axios.get(
        `https://tasty-treats-backend.p.goit.global/api/recipes?
        category=${selectedCategoryEL.innerHTML}
        &title=${searchSelectEl.value}&area=${areaSelectElement.value}
        &time=${timeSelectEl.value}&ingredient=${ingredientsSelectElement.value}
        &page=1&limit=6`)
    
    const result = await response.data
    return result;
}

formEl.addEventListener('change', _.debounce(() => {
    recipesReq()
}, 300, {leading : false, trailing : true}))