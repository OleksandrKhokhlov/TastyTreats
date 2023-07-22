import axios from "axios";

const areaSelectElement = document.querySelector('#area-key');
const ingredientsSelectElement = document.querySelector('#ingredients-key');

const getAreaKeys = async () =>{
    const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/areas')
    
    const result = await response.data
    console.log(result)
    return result
}

const getIngredientsKeys = async () =>{
    const response = await axios.get('https://tasty-treats-backend.p.goit.global/api/ingredients')
    
    const result = await response.data
    console.log(result)
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