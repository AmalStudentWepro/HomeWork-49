import { ProductCard } from '../components/ProductCard.js';

export function render(arr, place, Component) {
  place.innerHTML = "";
  for (let item of arr) {
    const elem = Component(item);
    place.append(elem);
  }
}

export function renderGoodsSection(goods, parent) {
  let container = document.getElementById('goods');

  if (!container) {
    container = document.createElement('div');
    container.id = 'goods';
    container.className = 'goods-section';
    parent.appendChild(container);
  }

  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Популярное >';
  title.className = 'goods-title';
  container.appendChild(title);

  render(goods, container, ProductCard);
}
