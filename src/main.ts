import { UI } from './ui/UI';
import { productList, cartList, checkoutBtn, confirmOder, checkout, checkoutList, cart } from './utils/dom';

document.addEventListener('DOMContentLoaded', UI.fetchData);

productList.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  UI.getProduct(target);
  UI.increaseCount(target);
  UI.decreaseCount(target);
});

cartList.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLButtonElement;
  UI.removeCartItem(target);
});

confirmOder.addEventListener('click', () => {
  checkout.classList.add('active');
});

checkoutBtn.addEventListener('click', () => {
  const totalPrice = cart.querySelector('.grand-total') as HTMLSpanElement;
  const totalUnit = cart.querySelector('.items__count') as HTMLSpanElement;
  
  const cartListItems = Array.from(cartList.children) as HTMLLIElement[];
  cartListItems.forEach(listItem => {
    let listTitle = listItem.querySelector('.item__title') as HTMLHeadingElement;
    UI.resetProductItem(listTitle);
  });

  totalPrice.textContent = String(0);
  totalUnit.textContent = String(0);
  
  cartList.innerHTML = "";
  checkoutList.innerHTML = "";
  
  checkout.classList.remove('active');
  UI.cartToggle(cartList);
});