'use strict';
import { testyTreatsAPI } from '/js/tasty-treatsAPI';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

let heroRef = document.querySelector('.swiper-wrapper');

const testy = new testyTreatsAPI();
async function getEvents() {
  const resp = await testy.loadEvents();
  return resp;
}
getEvents();

showInfo();

async function showInfo() {
  let eventInfo = await getEvents();
  let elem = eventInfo.data;
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

  heroRef.insertAdjacentHTMLL('afterbegin', markup);

  const swiper = new Swiper('.swiper', {
    modules: [Pagination, Autoplay],
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    // autoplay: {
    //   delay: 2000,
    // },
    spaceBetween: 8,
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
  });
}
