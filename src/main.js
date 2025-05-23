import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { renderGoodsSection } from './utils/render.js';
// import { createHeader } from './components/Header.js'; // потом доделаю (Амаль)


const main = document.createElement('main');
document.body.appendChild(main);

createHeader();
createSwiperSlider();
createCategories();

fetch("http://localhost:3000/goods")
  .then(res => res.json())
  .then(data => renderGoodsSection(data, main));


function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';

    const logo = document.createElement('div');
    logo.className = 'logo';

    const logoImg = document.createElement('img');
    logoImg.src = '/public/uzum.png';

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
      { img: '/public/user.webp', text: 'Войти' },
      { img: '/public/heart.webp', text: 'Избранное' },
      { img: '/public/korzina.png', text: 'Корзина' }
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
    '/public/slide1.png',
    '/public/slide2.png',
    '/public/slide3.png',
    '/public/slide4.png',
    '/public/slide5.png',
    '/public/slide6.png',
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
    { name: 'Детский мир', img: '/public/bear.png' },
    { name: 'Гарантия низких цен', img: '/public/check.png' },
    { name: 'Модный Базар', img: '/public/jacket.png' },
    { name: 'Товары недели', img: '/public/star.png' },
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
