'use strict';
import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
const ref = document.querySelector('#hero-cards');

const showImages = async () => axios.get(BASE_URL);

const loader = async () => {
  try {
    let a = await showImages(BASE_URL);
    console.log(a);
    showInfo(a);
  } catch {
    console.log('an arror happened');
  }
};

loader();

function showInfo(arr) {
  let elem = arr.data[0];
  console.log(elem);
  const markup = `<div class="hero-first-card card" >
        <img class="img" src="${elem.cook.imgUrl}" loading="lazy" alt="${elem.cook.name}">
        </div>
        <div class="hero-second-card card">
          <img class="img" src="${elem.topic.imgUrl}" loading="lazy" alt="${elem.topic.name}">
          <p class="hero-card-descr">${elem.topic.name}</p>
          <p class="hero-country">${elem.topic.area}</p>
        </div>
        <div class="hero-third-card card">
          <img class="img" src="${elem.topic.imgUrl}" loading="lazy" alt="${elem.topic.name}">
        </div>`;

  ref.insertAdjacentHTML('afterbegin', markup);
}
