// https://www.youtube.com/watch?v=uR3r3GJvQDY
// https://www.youtube.com/watch?v=pRkHOD_nkH4
// 

let localStor = JSON.parse(localStorage.getItem('product'));
console.table(localStor);
// let cart = document.querySelector('.cart');

for (let item of localStor) {

    let itemId = item.idProduit;
    let itemColor = item.color;
    let itemQuantity = item.quantity;


    fetch(`http://localhost:3000/api/products/${itemId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            const produit = document.createElement('article');
            const cart_in = document.querySelector('#cart__items')
            cart_in.appendChild(produit);
            produit.classList.add('cart__item');
            produit.setAttribute('data-id', itemId);
            produit.setAttribute('data-color', itemColor);

            const img_div = document.createElement('div');
            const image = document.createElement('img');
            image.src = data.imageUrl;
            image.alt = data.altTxt;
            produit.appendChild(img_div);
            img_div.appendChild(image);
            img_div.classList.add('cart__item__img');

            const cont_div = document.createElement('div');
            const des_div = document.createElement('div');
            cont_div.appendChild(des_div);
            produit.appendChild(cont_div);
            cont_div.classList.add('cart__item__content');
            des_div.classList.add('cart__item__content__description');

            const nameProduct = document.createElement('h2');
            des_div.appendChild(nameProduct);
            nameProduct.innerHTML = data.name;

            const colorProduct = document.createElement('p');
            des_div.appendChild(colorProduct);
            colorProduct.innerHTML = itemColor;

            const priceProduct = document.createElement('p');
            des_div.appendChild(priceProduct);
            priceProduct.innerHTML = data.price * itemQuantity + ' €';


            const setting_div = document.createElement('div');
            cont_div.appendChild(setting_div);
            setting_div.classList.add('cart__item__content__settings');

            const q_div = document.createElement('div');
            setting_div.appendChild(q_div);
            q_div.classList.add('cart__item__content__settings__quantity');

            const quantityProduct = document.createElement('p');
            q_div.appendChild(quantityProduct);
            quantityProduct.innerHTML = "Qté : " + itemQuantity;

            let productQuantity = document.createElement("input");
            q_div.appendChild(productQuantity);
            productQuantity.value = itemQuantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            const set_del_div = document.createElement('div');
            setting_div.appendChild(set_del_div);
            set_del_div.classList.add('cart__item__content__settings__delete');


            const buttonEmptyCart = document.createElement('p');
            set_del_div.appendChild(buttonEmptyCart);
            buttonEmptyCart.classList.add("deleteItem");
            buttonEmptyCart.innerText = "Supprimer";

            buttonEmptyCart.addEventListener("click", () => {
                localStorage.clear();


            })



            function countTotalInCart() {
                let arrayOfPrice = [];
                let totalPrice = document.getElementById("totalPrice");

                // On push chaque prix du DOM dans un tableau
                let productPriceAccordingToQuantity = document.querySelectorAll(".price");
                for (let price in productPriceAccordingToQuantity) {
                    arrayOfPrice.push(productPriceAccordingToQuantity[price].innerHTML);
                }

                // On enlève les undefined du tableau
                arrayOfPrice = arrayOfPrice.filter((el) => {
                    return el != undefined;
                });

                // Transformer en nombre chaque valeur du tableau
                arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));

                // Additionner les valeurs du tableau pour avoir le prix total
                const reducer = (acc, currentVal) => acc + currentVal;
                arrayOfPrice = arrayOfPrice.reduce(reducer);

                // Affichage du prix avec formatage €
                totalPrice.innerText = `${(arrayOfPrice = new Intl.NumberFormat(
                    "fr-FR",
                    {
                        style: "currency",
                        currency: "EUR",
                    }
                ).format(arrayOfPrice))}`;
            }




        })
        .catch(console.error);

}
