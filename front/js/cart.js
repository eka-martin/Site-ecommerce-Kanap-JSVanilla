// https://www.youtube.com/watch?v=uR3r3GJvQDY
// https://www.youtube.com/watch?v=pRkHOD_nkH4


//parsing an object JSON 
let localStor = JSON.parse(localStorage.getItem('product'));
console.table(localStor);
// let cart = document.querySelector('.cart');

//iterating localStorage
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

            //image
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

            //color
            const colorProduct = document.createElement('p');
            des_div.appendChild(colorProduct);
            colorProduct.innerHTML = itemColor;

            //prix, on ajoute class pour pouvoir recupere le prix pour "Total"
            const priceProduct = document.createElement('p');
            des_div.appendChild(priceProduct);
            priceProduct.classList = "product__price"
            priceProduct.innerHTML = data.price + ' €';


            const setting_div = document.createElement('div');
            cont_div.appendChild(setting_div);
            setting_div.classList.add('cart__item__content__settings');

            const q_div = document.createElement('div');
            setting_div.appendChild(q_div);
            q_div.classList.add('cart__item__content__settings__quantity');

            //quantite
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


            // button Supprimer
            const set_del_div = document.createElement('div');
            setting_div.appendChild(set_del_div);
            set_del_div.classList.add('cart__item__content__settings__delete');


            const buttonEmptyCart = document.createElement('p');
            set_del_div.appendChild(buttonEmptyCart);
            buttonEmptyCart.classList.add("deleteItem");
            buttonEmptyCart.innerText = "Supprimer";


            //const deleteItem = document.querySelectorAll(".deleteItem");
            //deleteItem.forEach(function (el, i) {
            buttonEmptyCart.addEventListener("click", (event) => {
                event.preventDefault()
                //let itemId = item.idProduit;
                //let itemColor = item.color;
                //Je selectionne l'élément à modifier selon son Id et sa couleur
                //const deleteId = data.id;
                //const deleteColor = localStor[i].color;

                localStor = localStor.filter(
                    (element) => {
                        //console.log(element.idProduit !== itemId, element.color !== itemColor)
                        return element.id !== itemId && element.color !== itemColor
                    });
                //console.log(localStor);
                localStorage.setItem("product", JSON.stringify(localStor));

                location.reload();// rafraichir la  page
                //})
            })

            //--------------------------------------------------------
            // La modification la quantité d'un produit dans le panier
            //--------------------------------------------------------
            let itemModif = document.querySelectorAll(".itemQuantity");


            for (let q = 0; q < itemModif.length; q++) {
                itemModif[q].addEventListener("change", (event) => {
                    event.preventDefault()
                    //Je selectionne l'élément à modifier selon son Id et sa couleur
                    let itemNew = localStor[q].quantity;
                    let itemModifValue = itemModif[q].valueAsNumber;

                    const result = localStor.filter(
                        (element) => element.itemModifValue !== itemNew);

                    result.quantity = itemModifValue;
                    localStor[q].quantity = result.quantity;

                    localStorage.setItem("product", JSON.stringify(localStor));

                    location.reload();// rafraichir la  page

                })
            }

            //TotalPrice
            // On récupère la quantité totale
            let elementsQuantity = document.getElementsByClassName('itemQuantity');
            //let myLength = elementsQuantity.length;
            totalQuantity = 0;

            for (let i = 0; i < elementsQuantity.length; i++) {
                totalQuantity += elementsQuantity[i].valueAsNumber;
            }

            let productTotalQuantity = document.getElementById('totalQuantity');
            productTotalQuantity.innerHTML = totalQuantity;


            // On récupère le prix total
            let elementPrice = document.getElementsByClassName("product__price");

            totalPrice = 0;
            for (let i = 0; i < elementsQuantity.length; i++) {
                let price = parseInt(elementPrice[i].innerHTML.split(" €")[0]);
                totalPrice += (elementsQuantity[i].valueAsNumber * price);

            }

            let productTotalPrice = document.getElementById('totalPrice');
            productTotalPrice.innerHTML = totalPrice;


        })
        .catch(console.error);

}

// --------------FORMULAIRE--------------------------
//saisir les coordonnées puis de confirmer la commande
// déclaration de contact et products 
//https://www.youtube.com/watch?v=CreEhp8I-XA&list=PLeHV46kDFIhK6NlpLJqLxjVanTWMast_8&index=13

let formulaire = document.querySelector('.cart__order__form input[type= "submit"]');
let inputs = document.querySelector(".cart__order__form__question");

let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let email = document.querySelector("#email");
let city = document.querySelector("#city");

let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");

//Création des expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let letterRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


let submit = document.querySelector("#order");

////condition avec RegExp et return des valeur boléennes 
/////////firstName/////////
firstName.addEventListener("input", function () {
    validFirstName(this);
});

const validFirstName = function (inputFirstName) {
    //déclaration de la validation sur faux
    let valid = false;
    //test la regex

    if (letterRegExp.test(inputFirstName.value)) {
        //si il n'y a pas de message d'erreur valid ok
        firstNameErrorMsg.textContent = "";
        contact.firstName = inputFirstName.value;
        valid = true;
    } else {
        //si il y a un message d'erreur valide reste false
        firstNameErrorMsg.textContent = "le prénom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres";
        //on retourne le résultat de valid pour chaque champ
        valid = false;
    }
    return valid;
};
/////////lastName/////////
lastName.addEventListener("input", function () {
    //parametre 'this'   s'agit de inpit  
    validlastName(this);
});

const validlastName = function (inputlastName) {
    let valid = false;

    if (letterRegExp.test(inputlastName.value)) {
        lastNameErrorMsg.textContent = "";
        contact.lastName = inputlastName.value;
        valid = true;
    } else {
        lastNameErrorMsg.textContent = "le nom doit avoir 3 lettres minimum et pas de caractère spéciaux ou chiffres";
        valid = false;
    }
    return valid;
};

/////////adresse/////////
address.addEventListener("input", function () {
    //parametre 'this'   s'agit de inpit  
    validAddress(this);
});

const validAddress = function (inputAddress) {
    let valid = false;

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.textContent = "";
        contact.address = inputAddress.value;
        valid = true;
    } else {
        addressErrorMsg.textContent = "veuillez rentrer une adresse valide, max 50 caractères";
        valid = false;
    }
    return valid;
};
/////////city/////////
city.addEventListener("input", function () {
    //parametre 'this'   s'agit de inpit  
    validCity(this);
});

const validCity = function (inputCity) {
    let valid = false;

    if (letterRegExp.test(inputCity.value)) {
        cityErrorMsg.textContent = "";
        contact.city = inputCity.value;
        valid = true;
    } else {
        cityErrorMsg.textContent = "veuillez rentrer le nom de votre ville ou village sans le code postal";
        valid = false;
    }
    return valid;
};

/////////email/////////
email.addEventListener("input", function () {
    //parametre 'this'   s'agit de inpit  
    validEmail(this);
});

const validEmail = function (inputEmail) {
    let valid = false;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.textContent = "";
        contact.email = inputEmail.value;
        valid = true;
    } else {
        emailErrorMsg.textContent = "Email non valide, l'exemple canape@monmail.com";
        valid = false;
    }
    return valid;
};

//------------------------------------------------------------
//------------------------Button------------------------------
//------------------------------------------------------------
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};

let products = [];
//listen orderButton
let orderButton = document.querySelector("#order").addEventListener("click", (e) => {
    e.preventDefault();
    if (
        letterRegExp.test(firstName.value) == false ||
        letterRegExp.test(lastName.value) == false ||
        addressRegExp.test(address.value) == false ||
        letterRegExp.test(city.value) == false ||
        emailRegExp.test(email.value) == false
    ) {
        window.alert("Certains champs du formulaire sont manquants ou mal renseignés");
    } else if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
    ) {
        window.alert("Merci de remplir tout les champs");
    } else {
        //création contact sur LocalStorage
        localStorage.setItem("contact", JSON.stringify(contact));


        //Si le panier n'est pas vide
        if (localStor && localStor.length) {
            for (let articleSelect of localStor) {
                products.push(articleSelect.idProduit)
            };

            let order = {
                contact: contact,
                products: products,
            };


            // ----------------------------------------------------------------
            // fetch avec POST transforme JSON grace aux headers informations
            // méthode http body 
            // ----------------------------------------------------------------
            //console.log('test2');
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(order),

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    //console.log(data);
                    //console.log('test');
                    //window.location.assign("confirmation.html?id=" + data.orderId)
                    let confirmationUrl = "./confirmation.html?id=" + data.orderId;
                    window.location.href = confirmationUrl;
                });

        }
    }
});



// ----------------------------------------------------
// buttonEmptyCart.addEventListener("click", () => {
//     localStorage.clear();

// })
// ------------------------------------------------------------------------------------------
