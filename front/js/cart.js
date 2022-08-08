// https://www.youtube.com/watch?v=mNgY4jE6Gio
// https://www.youtube.com/watch?v=uR3r3GJvQDY
// https://www.youtube.com/watch?v=pRkHOD_nkH4
// 

let cart_in = document.getElementById('cart__items');
const produit = document.createElement('article');
const img_div = document.createElement('div');
const image = document.createElement('img');
// image.src = product.imageUrl;
image.alt = "Photographie d'un canapé";

cart_in.appendChild(produit);
produit.appendChild(img_div);
image.appendChild(img_div);

produit.classList.add('cart__item');
img_div.classList.add('cart__item__img');



// adds an event listener to clear our cart

// document.getElementById("clear-cart").addEventListener("click", () => {

//     localStorage.removeItem("cart");

//     alert("Cart is cleared!");

// });