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
      return `<div class="swiper-slide">
                <div class="cook swiper-item">
                  <img class="img" src="${evt.cook.imgUrl}" loading="lazy" alt="${evt.cook.name}">
                </div>
                <div class="small-dish swiper-item">
                  <div class="event-info">
                      <img class="img" src="${evt.topic.previewUrl}" loading="lazy" alt="${evt.topic.name}">
                    <p class="event-descr">${evt.topic.name}</p>
                    <p class="event-country">${evt.topic.area}</p>
                  </div>s
                </div>
                <div class="big-dish swiper-item" style="background-image:url('${evt.topic.previewUrl}')"></div>
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
    // slidesPerView: 3,
    // slidesPerGroup: 3,
  });
}

// <div class="big-dish swiper-slide">
//   <img class="img" src="${evt.topic.previewUrl}" loading="lazy" alt="${evt.topic.name}">
// </div>`;
