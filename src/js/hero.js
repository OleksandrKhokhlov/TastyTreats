'use strict';
import axios from 'axios';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
const ref = document.querySelector('#swiper-wrapper');

const showImages = async () => axios.get(BASE_URL);

const loader = async () => {
  try {
    let a = await showImages(BASE_URL);
    showInfo(a);
  } catch {
    console.log('an arror happened');
  }
};

loader();

function showInfo(arr) {
  let elem = arr.data;
  const markup = `<div class="cook swiper-slide" >
    <img class="img" src="${elem[0].cook.imgUrl}" loading="lazy" alt="${elem[0].cook.name}">
  </div>
  <div class="small-dish swiper-slide">
    <img class="img" src="${elem[0].topic.imgUrl}" loading="lazy" alt="${elem[0].topic.name}">
    <p class="hero-card-descr">${elem[0].topic.name}</p>
    <p class="hero-country">${elem[0].topic.area}</p>
  </div>
  <div class="big-dish swiper-slide">
    <img class="img" src="${elem[0].topic.imgUrl}" loading="lazy" alt="${elem[0].topic.name}">
  </div>
  <div class="cook swiper-slide" >
    <img class="img" src="${elem[1].cook.imgUrl}" loading="lazy" alt="${elem[1].cook.name}">
  </div>
  <div class="small-dish swiper-slide">
    <img class="img" src="${elem[1].topic.imgUrl}" loading="lazy" alt="${elem[1].topic.name}">
    <p class="hero-card-descr">${elem[1].topic.name}</p>
    <p class="hero-country">${elem[1].topic.area}</p>
  </div>
  <div class="big-dish swiper-slide">
    <img class="img" src="${elem[1].topic.imgUrl}" loading="lazy" alt="${elem[1].topic.name}">
  </div>
  <div class="cook swiper-slide" >
    <img class="img" src="${elem[2].cook.imgUrl}" loading="lazy" alt="${elem[2].cook.name}">
  </div>
  <div class="small-dish swiper-slide">
    <img class="img" src="${elem[2].topic.imgUrl}" loading="lazy" alt="${elem[2].topic.name}">
    <p class="hero-card-descr">${elem[2].topic.name}</p>
    <p class="hero-country">${elem[2].topic.area}</p>
  </div>
  <div class="big-dish swiper-slide">
    <img class="img" src="${elem[2].topic.imgUrl}" loading="lazy" alt="${elem[2].topic.name}">
  </div>`;

  ref.insertAdjacentHTML('afterbegin', markup);
}

// ---------------------------------Swiper ------------------------------------------
const swiper = new Swiper('.swiper', {
  modules: [Pagination],
  pagination: {
    el: '.swiper-pagination',
    bulletClass: 'swiper-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active',
  },
  spaceBetween: 8,
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 3,
});
