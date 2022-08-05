let cart_in = document.getElementById('cart__items');
const produit = document.createElement('article');
cart_in.appendChild(produit);
produit.classList.add('cart__item');



// adds an event listener to clear our cart

// document.getElementById("clear-cart").addEventListener("click", () => {

//     localStorage.removeItem("cart");

//     alert("Cart is cleared!");

// });