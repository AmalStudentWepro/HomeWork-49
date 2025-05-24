import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { renderGoodsSection } from './utils/render.js';
// import { createHeader } from './components/Header.js'; // потом доделаю (Амаль)
import axios from 'axios';

const main = document.createElement('main');
document.body.appendChild(main);

createHeader();
createSwiperSlider();
createCategories();


function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';

    const logo = document.createElement('div');
    logo.className = 'logo';

    const logoImg = document.createElement('img');
    logoImg.src = '/public/img/uzum.png';

    const logoText = document.createElement('span');
    logoText.textContent = 'Uzum market';

    logo.append(logoImg, logoText);

    const catalog = document.createElement('button');
    catalog.className = 'catalog-button';
    catalog.textContent = 'Каталог';

    const search = document.createElement('div');
    search.className = 'search';

    const input = document.createElement('input');
    input.placeholder = 'Искать товары и категории';

    const searchIcon = document.createElement('img');
    searchIcon.src = 'https://cdn-icons-png.flaticon.com/512/622/622669.png';
    searchIcon.alt = 'Поиск';

    search.append(input, searchIcon);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const icons = [
      { img: '/img/user.webp', text: 'Войти' },
      { img: '/img//heart.webp', text: 'Избранное' },
      { img: '/img/korzina.png', text: 'Корзина' }
    ];

    icons.forEach(item => {
      const icon = document.createElement('a');
      icon.className = 'icon';
      icon.href = '#';

      const img = document.createElement('img');
      img.src = item.img;

      const span = document.createElement('span');
      span.textContent = item.text;

      icon.append(img, span);
      actions.appendChild(icon);
    });

    header.append(logo, catalog, search, actions);
    main.appendChild(header);
}

function createSwiperSlider() {
  const swiper = document.createElement('div');
  swiper.className = 'swiper';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  const images = [
    '/img/slide1.jpg',
    '/img/slide2.jpg',
    '/img/slide3.jpg',
    '/img/slide4.jpg',
    '/img/slide5.jpg',
    '/img/slide6.jpg',
    '/img/slide7.jpg',
    '/img/slide8.jpg',
    '/img/slide9.jpg',
    '/img/slide10.jpg',
    '/img/slide11.jpg',
    '/img/slide12.jpg',
    '/img/slide13.jpg',
    '/img/slide14.jpg',
    '/img/slide15.jpg',
  ];

  images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Slide image';

    slide.appendChild(img);
    wrapper.appendChild(slide);
  });

  swiper.appendChild(wrapper);

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination';

  const prev = document.createElement('div');
  prev.className = 'swiper-button-prev';
  prev.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const next = document.createElement('div');
  next.className = 'swiper-button-next';
  next.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const scrollbar = document.createElement('div');
  scrollbar.className = 'swiper-scrollbar';

  swiper.append(pagination, prev, next, scrollbar);
  main.appendChild(swiper);

  new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  });
}

function createCategories() {
  const container = document.createElement('div');
  container.className = 'categories';

  const data = [
    { name: 'Детский мир', img: '/img/bear.png' },
    { name: 'Гарантия низких цен', img: '/img/check.png' },
    { name: 'Модный Базар', img: '/img/jacket.png' },
    { name: 'Товары недели', img: '/img/star.png' },
  ];

  data.forEach(({ name, img }) => {
    const block = document.createElement('div');
    block.className = 'category';

    const icon = document.createElement('img');
    icon.src = img;
    icon.alt = name;

    const span = document.createElement('span');
    span.textContent = name;

    block.append(icon, span);
    container.appendChild(block);
  });

  main.appendChild(container);
}

axios.get('http://localhost:3000/goods')
  .then(res => renderGoodsSection(res.data, main, 'Все товары'))
  .catch(err => console.error(err));