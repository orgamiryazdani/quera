// Elements
const nextBtn = document.querySelector(".js-next-btn");
const productCard = document.querySelector(".js-product-card");
const previousBtn = document.querySelector(".js-previous-btn");
const productCardLink = document.querySelector(".js-product-link");
const productCardImage = document.querySelector(".js-product-card-image");
const productCardTitle = document.querySelector(".js-product-card-title");
const productCardPrice = document.querySelector(".js-product-card-price");
const productCardDiscountOldPrice = document.querySelector(
  ".js-product-card-discount-old-price"
);
const productCardDiscountContainer = document.querySelector(
  ".js-product-card-discount-container"
);
const productCardDiscountPercentage = document.querySelector(
  ".js-product-card-discount-percentage"
);

const PRODUCTS = window.productsListData || [];

// Variables
let currentIndex = 0;
let intervalId;
const lastTwoProductIndexes = [];

// Functions
function showProduct(product) {
  if (!product) return;
  productCardTitle.innerHTML = product.title;
  productCardLink.setAttribute("href", product.url);
  productCardImage.setAttribute("src", product.image);
  productCard.setAttribute("data-product-id", product.id);
  productCardPrice.innerHTML = window.formatPrice(product.price.selling_price);
  if (product.price.discount_percent > 0) {
    productCardDiscountContainer.classList.remove("hidden");
    productCardDiscountOldPrice.innerHTML = window.formatPrice(
      product.price.main_price
    );
    productCardDiscountPercentage.innerHTML = `${window.formatPrice(
      product.price.discount_percent
    )}٪`;
  } else {
    productCardDiscountContainer.classList.add("hidden");
  }
}

function generateRandomIndex() {
  const availableIndexes = PRODUCTS.map((_, index) => index).filter(
    (index) => !lastTwoProductIndexes.includes(index)
  );
  const randomIndex = Math.floor(Math.random() * availableIndexes.length);
  return availableIndexes[randomIndex];
}

function nextProduct() {
  if (PRODUCTS.length < 4) return;
  const newIndex = generateRandomIndex();
  lastTwoProductIndexes.push(currentIndex);
  if (lastTwoProductIndexes.length > 2) {
    lastTwoProductIndexes.shift();
  }
  currentIndex = newIndex;
  showProduct(PRODUCTS[currentIndex]);
}

function previousProduct() {
  if (PRODUCTS.length < 4 || lastTwoProductIndexes.length < 2) return;
  const previousIndex = lastTwoProductIndexes.pop();
  lastTwoProductIndexes.unshift(currentIndex);
  currentIndex = previousIndex;
  showProduct(PRODUCTS[currentIndex]);
}

function init() {
  showProduct(PRODUCTS[currentIndex]);

  if (!intervalId) {
    intervalId = setInterval(() => {
      nextProduct();
    }, 4000);
  }
}

// Start
init();

// Navigation
nextBtn.addEventListener("click", () => {
  nextProduct();
  clearInterval(intervalId);
  intervalId = null;
  init();
});

previousBtn.addEventListener("click", () => {
  previousProduct();
  clearInterval(intervalId);
  intervalId = null;
  init();
});