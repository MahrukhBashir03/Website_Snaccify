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









// const products = [
//       // Paste your JSON product list directly here:
//       // e.g. { "id": 1, "title": "Sausage Pasta", ... },
//       // shortened for display here
//       // ⚠️ Make sure you paste it in real code!
//       {
//         "title": "Sausage Pasta",
//         "price": "Rs 650",
//         "url": "./images/SausagePasta.png",
//         "category": "Noodles"
//       },
//       {
//         "title": "Tacos",
//         "price": "Rs 635",
//         "url": "./images/tacos.png",
//         "category": "Fast Food"
//       },
//       {
//         "title": "Chocolate Cookies",
//         "price": "Rs 260",
//         "url": "./images/cookies.png",
//         "category": "Desserts"
//       },
//       {
//         "title": "Oreo Shake",
//         "price": "Rs 680",
//         "url": "./images/oreoshake.png",
//         "category": "Drinks"
//       },
//       {
//         "title": "Chicken Biryani",
//         "price": "Rs 500",
//         "url": "./images/biryani.png",
//         "category": "Desi"
//       },
//       {
//         "title": "Ice Cream",
//         "price": "Rs 300",
//         "url": "./images/icecream.jpg",
//         "category": "Desserts"
//       },
//       {
//         "title": "Soft Drinks",
//         "price": "Rs 120",
//         "url": "./images/softdrinks.jpg",
//         "category": "Drinks"
//       },
//       {
//         "title": "Beef Burger",
//         "price": "Rs 1050",
//         "url": "./images/burger.jpg",
//         "category": "Fast Food"
//       }
//       // Add all items here...
//     ];

//     function getRandomByCategory(category) {
//       const filtered = products.filter(item => item.category === category);
//       return filtered[Math.floor(Math.random() * filtered.length)];
//     }

//     function extractPrice(price) {
//       return parseInt(price.replace(/[^\d]/g, ''));
//     }

//     function showSurpriseDeal() {
//       const mains = ['Noodles', 'Fast Food', 'Desi', 'Chinese', 'Pizza'];
//       const mainItem = getRandomByCategory(mains[Math.floor(Math.random() * mains.length)]);
//       const drink = getRandomByCategory('Drinks');
//       const dessert = getRandomByCategory('Desserts');

//       const items = [mainItem, drink, dessert];

//       const dealDiv = document.getElementById("deal");
//       const totalDiv = document.getElementById("total");
//       dealDiv.innerHTML = "";

//       let totalPrice = 0;

//       items.forEach(item => {
//         totalPrice += extractPrice(item.price);

//         const card = document.createElement("div");
//         card.className = "item-card";
//         card.innerHTML = `
//           <img src="${item.url}" alt="${item.title}">
//           <h3>${item.title}</h3>
//           <p>${item.price}</p>
//           <small>${item.category}</small>
//         `;
//         dealDiv.appendChild(card);
//       });

//       totalDiv.textContent = `Total Deal Price: Rs ${totalPrice}`;
//     }

    
