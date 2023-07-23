import axios from "axios"
import SlimSelect from 'slim-select'
import _ from "lodash"


const formEl = document.querySelector('.search-filters');

const searchSelectEl = document.querySelector('#search-key');
const timeSelectEl = document.querySelector('#time-key')
const areaSelectElement = document.querySelector('#area-key');
const ingredientsSelectElement = document.querySelector('#ingredients-key');
const resetFiltersEl = document.querySelector('.filter-reset')

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

getAreaKeys()
.then((results) => {
    for(let result in results){
        areaSelectElement.insertAdjacentHTML('beforeend',
        `
            <option value="${results[result].name}">${results[result].name}</option>
        `)
    }
})

getIngredientsKeys()
.then((results) => {
    for(let result in results){
        ingredientsSelectElement.insertAdjacentHTML('beforeend',
        `
            <option value="${results[result].name}">${results[result].name}</option>
        `)
    }

})


new SlimSelect({
    select : timeSelectEl,
    settings : {
        showSearch : false,
        placeholderText: '0 min',
        allowDeselect: true,
    }
})

new SlimSelect({
    select : areaSelectElement,
    settings : {
        showSearch : false,
        placeholderText: 'Region',
        allowDeselect: true,
    }
})

new SlimSelect({
    select : ingredientsSelectElement,
    settings : {
        showSearch : false,
        placeholderText: 'Product',
        allowDeselect: true,
    }
})

//const recipesReq = async () =>{
//    const response = await axios.get(
//        `https://tasty-treats-backend.p.goit.global/api/recipes?
//        title=${searchSelectEl.value}&area=${areaSelectElement.value}
//        &time=${timeSelectEl.value}&ingredient=${ingredientsSelectElement.value}
//        &page=1&limit=6`)
//    
//   console.log("RESULT: " + response)
//}

formEl.addEventListener('change', _.debounce(() => {
    recipesReq()
}, 300, {leading : false, trailing : true}))

