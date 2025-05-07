import type { ProductType } from "../types/product";
import {
  productList,
  cartList,
  cart,
  checkoutList,
  checkout,
} from "../utils/dom";

export class UI {
  static fetchData() {
    fetch("/src/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Expected an array in data.json");
          return;
        }
        data.forEach((element: ProductType) => {
          if (
            element.image &&
            element.name &&
            element.category &&
            element.price
          ) {
            UI.addProduct(element);
          } else {
            console.warn("Invalid product data:", element);
          }
        });
      })
      .catch((error) => {
        console.error("Failed to fetch data.json:", error);
      });
  }

  static addProduct(product: ProductType) {
    if (!productList) {
      console.error("productList element not found");
      return;
    }
    const liEl = document.createElement("li");
    liEl.innerHTML = `
      <div class="product__img">
        <img
          class="product__image"
          src="${product.image.desktop}"
          alt="${product.category}" />
        <div class="add-to-cart">
          <button class="add-to-cart-btn">
            <img
              src="./assets/images/icon-add-to-cart.svg"
              alt="cart icon image" />
            <span>Add to cart</span>
          </button>
          <div class="counter">
            <button id="decrease-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
            </button>
            <span class="count">0</span>
            <button id="increase-count">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 10">
                <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="product__content">
        <span class="product__category">${product.category}</span>
        <h3 class="product__name">${product.name}</h3>
        <h4>$<span class="product__price">${product.price.toFixed(2)}</span></h4>
      </div>
    `;
    liEl.classList.add("product__item");
    productList.appendChild(liEl);
  }

static getProduct(target: HTMLElement) {
    if (target.classList.contains("add-to-cart-btn")) {
      const counter = target.nextElementSibling as HTMLElement;
      const image = target
        .closest(".product__item")
        ?.querySelector(".product__image") as HTMLImageElement;
      if (!counter || !image) {
        console.error("Counter or image not found");
        return;
      }
      target.classList.add("inactive");
      counter.classList.add("active");
      image.classList.add("active");

      let countContainer = counter.querySelector(".count") as HTMLElement;
      let productCount: number = Number(countContainer?.textContent) || 0;
      productCount++;
      if (!countContainer) {
        console.error("Count container not found");
        return;
      }
      countContainer.textContent = String(productCount);

      let product = target.closest(".product__item") as HTMLElement;
      if (!product) {
        console.error("Product item not found");
        return;
      }
      UI.addProductToCart(product);
      UI.updateItemCount();
      UI.updateGrandTotal();
    }
  }

static addProductToCart(product: HTMLElement) {
    let productName = product.querySelector(".product__name")?.textContent;
    let productPrice = Number(
      product.querySelector(".product__price")?.textContent
    );
    let productImg = product.querySelector(
      ".product__image"
    ) as HTMLImageElement;

    if (!productName || !productImg || isNaN(productPrice)) {
      console.error("Invalid product data for cart:", {
        productName,
        productPrice,
        productImg,
      });
      return;
    }

    UI.updateCheckout(productName, productPrice, productImg.src);
    UI.createOrder(productName, productPrice);
  }

static createOrder(productName: string, productPrice: number) {
    if (!cartList) {
      console.error("cartList element not found");
      return;
    }
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart__item");
    cartItem.innerHTML = `
      <div class="cart__content">
        <h3 class="item__title">${productName}</h3>
        <div>
          <div class="unit-bg">
            <span class="unit">1</span><span>x</span>
          </div>
          <div class="unit-price-bg">@ $<span class="unit-price">${productPrice.toFixed(2)}</span></div>
          <h4>$<span class="total-price">${productPrice.toFixed(2)}</span></h4>
        </div>
      </div>
      <button class="cart-delete-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            clip-rule="evenodd" />
        </svg>
      </button>
    `;
    cartList.appendChild(cartItem);
    UI.cartToggle(cartList);
  }

static increaseCount(target: HTMLElement) {
    if (target.id === "increase-count") {
      let countEl = target.previousElementSibling as HTMLElement;

      let count: number = Number(countEl.textContent) || 0;
      count++;
      if (!countEl) {
        console.error("Count element not found");
        return;
      }
      countEl.textContent = String(count);
      UI.updateUnit(count, target);
      UI.updateItemCount();
      UI.updateGrandTotal();
      UI.cartToggle(cartList);
    }
  }

static decreaseCount(target: HTMLElement) {
    if (target.id === "decrease-count") {
      let countEl = target.nextElementSibling as HTMLElement;

      let count: number = Number(countEl.textContent) || 0;
      count--;
      if (!countEl) {
        console.error("Count element not found");
        return;
      }
      countEl.textContent = String(count);
      if (count === 0) {
        const parent = target.parentElement;
        if (parent) {
          parent.previousElementSibling?.classList.remove("inactive");
          parent.classList.remove("active");
          parent
            .closest(".product__item")
            ?.querySelector(".product__image")
            ?.classList.remove("active");
        }
      }
      UI.updateUnit(count, target);
      UI.updateItemCount();
      UI.updateGrandTotal();
      UI.cartToggle(cartList);
    }
  }

static updateUnit(count: number, target: HTMLElement) {
    let cartItems = Array.from(cartList.children as HTMLCollection);
    let checkoutItems = Array.from(checkoutList.children as HTMLCollection);
    let targetParentTitle = target.parentElement
      ?.closest(".product__item")
      ?.querySelector(".product__name")?.textContent;

    if (!targetParentTitle) {
      console.error("Target parent title not found");
      return;
    }

    cartItems.forEach((item) => {
      let itemTitle = item.querySelector(".item__title")?.textContent;
      if (itemTitle === targetParentTitle) {
        let itemCount = item.querySelector(".unit") as HTMLElement;
        let unit = item.querySelector(".unit-price") as HTMLElement;
        let itemTotal = item.querySelector(".total-price") as HTMLElement;

        if (!itemCount || !unit || !itemTotal) {
          console.error("Cart item elements not found");
          return;
        }

        itemCount.textContent = String(count);
        itemTotal.textContent = (Number(unit?.textContent) * count).toFixed(2);

        if (itemCount.textContent === "0") {
          cartList.removeChild(item);
        }
      }
    });

    checkoutItems.forEach((item) => {
      let itemTitle = item.querySelector(".item__title")?.textContent;
      if (itemTitle === targetParentTitle) {
        let itemCount = item.querySelector(".unit") as HTMLElement;
        let unit = item.querySelector(".unit-price") as HTMLElement;
        let itemTotal = item.querySelector(".total-price") as HTMLElement;

        if (!itemCount || !unit || !itemTotal) {
          console.error("Checkout item elements not found");
          return;
        }

        itemCount.textContent = String(count);
        itemTotal.textContent = (Number(unit?.textContent) * count).toFixed(2);

        if (itemCount.textContent === "0") {
          checkoutList.removeChild(item);
        }
      }
    });
  }

static updateItemCount() {
    let cartItems = Array.from(cartList.children as HTMLCollection);
    let countArray: number[] = [];
    cartItems.forEach((item) => {
      let itemCount = Number(item.querySelector(".unit")?.textContent) || 0;
      countArray.push(itemCount);
    });

    let totalCount = countArray.reduce(
      (previousValue: number, nextValue: number) => {
        return previousValue + nextValue;
      },
      0
    );

    const itemsCount = cart.querySelector(".items__count") as HTMLSpanElement;
    if (!itemsCount) {
      console.error("Items count element not found");
      return;
    }
    itemsCount.textContent = String(totalCount);
  }

static updateGrandTotal() {
    let cartItems = Array.from(cartList.children as HTMLCollection);
    let totalArray: number[] = [];
    cartItems.forEach((item) => {
      let itemTotal =
        Number(item.querySelector(".total-price")?.textContent) || 0;
      totalArray.push(itemTotal);
    });

    let grandTotal = totalArray.reduce(
      (previousValue: number, nextValue: number) => {
        return previousValue + nextValue;
      },
      0
    );

    const itemsTotal = cart.querySelector(".grand-total") as HTMLSpanElement;
    const checkoutTotal = checkout.querySelector(
      ".grand-total"
    ) as HTMLSpanElement;

    if (!itemsTotal || !checkoutTotal) {
      console.error("Grand total elements not found");
      return;
    }

    itemsTotal.textContent = grandTotal.toFixed(2);
    checkoutTotal.textContent = grandTotal.toFixed(2);
  }

  static cartToggle(cartList: HTMLUListElement) {
    const cartInactive = cart.querySelector(
      ".cart__inactive"
    ) as HTMLDivElement;
    const cartActive = cart.querySelector(".cart__active") as HTMLDivElement;

    if (!cartInactive || !cartActive) {
      console.error("Cart toggle elements not found");
      return;
    }

    if (cartList.children.length >= 1) {
      cartInactive.classList.add("inactive");
      cartActive.classList.add("active");
    } else {
      cartInactive.classList.remove("inactive");
      cartActive.classList.remove("active");
    }
  }

static removeCartItem(target: HTMLButtonElement) {
    if (target.classList.contains("cart-delete-btn")) {
      const cartItem = target.closest(".cart__item") as HTMLLIElement;
      if (!cartItem) {
        console.error("Cart item not found");
        return;
      }

      const cartTitle = cartItem.querySelector(
        ".item__title"
      ) as HTMLHeadingElement;
      const cartItemPrice = cartItem.querySelector(
        ".total-price"
      ) as HTMLSpanElement;
      const cartItemUnit = cartItem.querySelector(".unit") as HTMLSpanElement;

      const totalPrice = cart.querySelector(".grand-total") as HTMLSpanElement;
      const checkoutTotalPrice = checkout.querySelector(
        ".grand-total"
      ) as HTMLSpanElement;
      const totalUnit = cart.querySelector(".items__count") as HTMLSpanElement;

      if (
        !cartTitle ||
        !cartItemPrice ||
        !cartItemUnit ||
        !totalPrice ||
        !checkoutTotalPrice ||
        !totalUnit
      ) {
        console.error("Cart item elements not found for removal");
        return;
      }

      let totalRemaining: number =
        Number(totalPrice.textContent) - Number(cartItemPrice.textContent);
      totalPrice.textContent = totalRemaining.toFixed(2);
      checkoutTotalPrice.textContent = totalRemaining.toFixed(2);

      let unitRemaining: number =
        Number(totalUnit.textContent) - Number(cartItemUnit.textContent);
      totalUnit.textContent = unitRemaining.toString();

      UI.resetProductItem(cartTitle);

      let checkoutItems = Array.from(checkoutList.children as HTMLCollection);
      checkoutItems.forEach((item) => {
        if (
          item.querySelector(".item__title")?.textContent ===
          cartTitle.textContent
        ) {
          checkoutList.removeChild(item);
        }
      });

      cartList.removeChild(cartItem);
      UI.cartToggle(cartList);
    }
  }

static resetProductItem(title: HTMLHeadingElement) {
    let productLists = Array.from(productList.children) as HTMLLIElement[];

    productLists.forEach((productList) => {
      let productTitle = productList.querySelector(
        ".product__name"
      ) as HTMLHeadingElement;

      if (productTitle.textContent === title.textContent) {
        const addToCartBtn = productList.querySelector(
          ".add-to-cart-btn"
        ) as HTMLButtonElement;
        const counterBtn = productList.querySelector(
          ".counter"
        ) as HTMLDivElement;
        const count = productList.querySelector(".count") as HTMLSpanElement;
        const productImage = productList.querySelector(
          ".product__image"
        ) as HTMLImageElement;

        if (!addToCartBtn || !counterBtn || !count || !productImage) {
          console.error("Product item elements not found for reset");
          return;
        }

        productImage.classList.remove("active");
        count.textContent = "0";
        counterBtn.classList.remove("active");
        addToCartBtn.classList.remove("inactive");
      }
    });
  }

static updateCheckout(
    productName: string,
    productPrice: number,
    productImg: string
  ) {
    if (!checkoutList) {
      console.error("checkoutList element not found");
      return;
    }
    const checkoutItem = document.createElement("li");
    checkoutItem.classList.add("checkout__item");
    checkoutItem.innerHTML = `
      <div class="checkout__content">
        <img src="${productImg}" class="checkout__img" alt="${productName}"/>
        <div>
          <h3 class="item__title">${productName}</h3>
          <div class="unit-bg">
            <span><span class="unit">1</span>x</span>
            <div class="unit-price-bg">@ $<span class="unit-price">${productPrice.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
      <h4>$<span class="total-price">${productPrice.toFixed(2)}</span></h4>
    `;
    checkoutList.appendChild(checkoutItem);
  }
}
