import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const main = document.createElement('main');
document.body.appendChild(main);

createHeader();
createSwiperSlider();
createCategories();

fetch('db.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    renderGoods(data.goods);
  });

function createHeader() {
  const header = document.createElement('header');

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

  const next = document.createElement('div');
  next.className = 'swiper-button-next';

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

  ['Детский мир', 'Гарантия низких цен', 'Модный Базар', 'Товары недели'].forEach(name => {
    const item = document.createElement('div');
    item.className = 'category';
    item.textContent = name;
    container.appendChild(item);
  });

  main.appendChild(container); 
}

fetch('db.json')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  renderGoods(data.goods);
});

function renderGoods(goods) {
  let container = document.getElementById('goods');

  if (!container) {
    container = document.createElement('div');
    container.id = 'goods';
    main.appendChild(container); 
  }

  container.innerHTML = '';

  for (let i = 0; i < goods.length; i++) {
    const item = goods[i];
    const card = document.createElement('div');
    card.className = 'good-card';

    const img = document.createElement('img');
    img.src = item.media[0];
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = item.title;
    card.appendChild(title);

    if (item.salePercentage > 0) {
      const oldPrice = document.createElement('div');
      oldPrice.className = 'old-price';
      oldPrice.textContent = item.price + '₽';
      card.appendChild(oldPrice);

      const salePrice = document.createElement('div');
      salePrice.className = 'price';
      const newPrice = Math.floor(item.price * (1 - item.salePercentage / 100));
      salePrice.textContent = newPrice + '₽';
      card.appendChild(salePrice);
    } else {
      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = item.price + '₽';
      card.appendChild(price);
    }

    container.appendChild(card);
  }
}
