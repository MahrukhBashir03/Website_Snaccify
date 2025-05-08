/* ========== Navigation =========== */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".nav-list .close");
const menu = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
  menu.classList.add("show");
});

close.addEventListener("click", () => {
  menu.classList.remove("show");
});

/* ========== SignIn Form =========== */
const signInForm = document.querySelector("header .wrapper");

document.querySelector(".signin").onclick = () => {
  signInForm.classList.add("active");
};

document.querySelector(".close-form").onclick = () => {
  signInForm.classList.remove("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const url = button.getAttribute("data-url");

      const newItem = { title, price, url };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${title} added to cart!`);
    });
  });
});


