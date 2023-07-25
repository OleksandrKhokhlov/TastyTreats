'use strict';
import { testyTreatsAPI } from '/js/tasty-treatsAPI';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

const heroRef = document.querySelector('#swiper-wrapper');
const cssloaderRef = document.querySelector('span.loader');

const testy = new testyTreatsAPI();

showInfo();
async function showInfo() {
  cssloaderRef.classList.remove('visually-hidden');
  let eventInfo = await testy.loadEvents();
  const markup = eventInfo.data
    .map(evt => {
      return `<div class="cook swiper-slide" >
      <img class="img" src="${evt.cook.imgUrl}" loading="lazy" alt="${evt.cook.name}">
    </div>
    <div class="small-dish swiper-slide">
      <div class="event-info">
      <img class="img" src="${evt.topic.imgUrl}" loading="lazy" alt="${evt.topic.name}">
      <p class="hero-card-descr">${evt.topic.name}</p>
      <p class="hero-country">${evt.topic.area}</p>
      </div>
    </div>
    <div class="big-dish swiper-slide" style="background-image:url('${evt.topic.previewUrl}')">
    </div>`;
    })
    .join('');

  heroRef.innerHTML = markup;
  cssloaderRef.classList.add('visually-hidden');

  const swiper = new Swiper('.swiper', {
    modules: [Pagination, Autoplay],
    pagination: {
      el: '.swiper-pagination',
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      clickable: true,
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

// <div class="big-dish swiper-slide">
//   <img class="img" src="${evt.topic.previewUrl}" loading="lazy" alt="${evt.topic.name}">
// </div>`;
