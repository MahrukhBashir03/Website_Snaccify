/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

/* ========== Fetch the Products =========== */
const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const ProductsWrapper = document.getElementById("products-wrapper");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  window.products = products; // Make products globally accessible
  displayProductItems(products);
  updateCartCount();
});

/* ========== Display Products =========== */
const displayProductItems = (items) => {
  let displayProduct = items.map((product) => {
    const cart = getCart();
    const cartItem = cart.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return ` 
      <div class="swiper-slide">
        <div class="card d-flex">
          <div class="image"><img src=${product.url} alt=""></div>
          <div class="rating">
            <span><i class="bx bxs-star"></i></span>
            <span><i class="bx bxs-star"></i></span>
            <span><i class="bx bxs-star"></i></span>
            <span><i class="bx bxs-star"></i></span>
            <span><i class="bx bxs-star"></i></span>
          </div>
          <h4>${product.title}</h4>
          <div class="price">
            <span>Price</span><span class="color">${product.price}</span>
          </div>
          <div class="quantity-controller" data-id="${product.id}">
            <button class="button btn quantity-minus">−</button>
            <span class="quantity">${quantity}</span>
            <button class="button btn quantity-plus">+</button>
          </div>
          <button class="button btn full-width add-to-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });

  displayProduct = displayProduct.join("");
  if (ProductsWrapper) {
    ProductsWrapper.innerHTML = displayProduct;
    attachQuantityEvents();
    swiper.update();
  }
};

/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll(".filters span")];

filters.forEach((filter) => {
  filters[0].classList.add("active");
  filter.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-filter");
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");

    let menuCategory = products.filter((product) => {
      return product.category === id;
    });

    if (id === "All Product") {
      displayProductItems(products);
    } else {
      displayProductItems(menuCategory);
    }
  });
});

/* ========== Quantity & Cart Events =========== */
function attachQuantityEvents() {
  document.querySelectorAll(".quantity-plus").forEach((button) => {
    button.addEventListener("click", () => {
      const quantityEl = button.parentElement.querySelector(".quantity");
      let currentQty = parseInt(quantityEl.textContent);
      quantityEl.textContent = currentQty + 1;
    });
  });

  document.querySelectorAll(".quantity-minus").forEach((button) => {
    button.addEventListener("click", () => {
      const quantityEl = button.parentElement.querySelector(".quantity");
      let currentQty = parseInt(quantityEl.textContent);
      if (currentQty > 0) {
        quantityEl.textContent = currentQty - 1;
      }
    });
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      const quantityEl = button.parentElement.querySelector(".quantity");
      const quantity = parseInt(quantityEl.textContent);
      addToCart(productId, quantity);
    });
  });
}

/* ========== Cart Management =========== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

function addToCart(productId, quantity) {
  let cart = getCart();
  const product = window.products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    if (quantity > 0) {
      existing.quantity = quantity;
    } else {
      cart = cart.filter((item) => item.id !== productId);
    }
  } else if (quantity > 0) {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  updateCartCount();
  displayProductItems(window.products);
  alert(`${product.title} has been added to cart with quantity: ${quantity}`);
}
