
let url = new URL(window.location.href);
let search_params = url.searchParams;


const id = url.searchParams.get('id');
console.log(id);


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);

        const name = document.getElementById('title');
        name.innerHTML = data.name;
        const des = document.getElementById('description');
        des.innerHTML = data.description;
        const prix = document.getElementById('price');
        prix.innerHTML = data.price;
        const div = document.querySelector('.item__img')
        let image = document.createElement('img');
        image.src = data.imageUrl;
        image.alt = data.altTxt;
        div.appendChild(image);
        const clr = document.getElementById('colors');
        // const colors = data.colors;
        // console.log(data.colors);
        for (let color of data.colors) {
            // console.log(color);
            let opt = document.createElement('option');
            opt.text = color; // it gives a name of color
            opt.value = color; // it gives a order in array
            clr.appendChild(opt);

        }

    })
    .catch(console.error);





const btn_envoyerPanier = document.getElementById('addToCart');
btn_envoyerPanier.addEventListener('click', (e) => {
    e.preventDefault();

    let optionProduit = {
        idProduit: id,
        color: document.getElementById('colors').selectedOptions[0].value,
        quantity: document.getElementById('quantity').value,

    };



    // let produitInCart = [];

    // if (localStorage.getItem('product') !== null) {
    //     produitInCart = JSON.parse(localStorage.getItem('product'));
    // }

    // produitInCart.push(optionProduit);
    // localStorage.setItem('product', JSON.stringify(produitInCart));

    //-------------------------------------------------------------------------

    let products = JSON.parse(localStorage.getItem('product'));

    if (products !== null) {
        let foundProduct = products.find(product => (product.idProduit === id));
        console.log(foundProduct);



        // if (products != null && foundProduct !== undefined) {
        //     let addQuantity = parseInt(optionProduit.quantity) + parseInt(foundProduct.quantity);
        //     foundProduct.quantity = addQuantity;
        //     console.log(addQuantity);
        //     localStorage.setItem("product", JSON.stringify(product));
        // } else {
        //     products.push(optionProduit);
        //     localStorage.setItem("product", JSON.stringify(products));
        // }


    } else {

        products.push(optionProduit);
        localStorage.setItem('product', JSON.stringify(products));
        console.log(products);
    }







    //     // for mozilla
    //     // window.location.href = "cart.html";

})










//https://stackoverflow.com/questions/54268951/react-fetchapi-how-to-take-data-from-related-json-by-id








