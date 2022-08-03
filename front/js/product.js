
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
        image.src = "../images/logo.png";
        image.alt = "Photographie d'un canapé";
        div.appendChild(image);
        const clr = document.getElementById('colors');
        // const colors = data.colors;
        // console.log(colors);
        for (let color in data.colors) {
            let opt = document.createElement('option');
            clr.appendChild(opt);
            opt.value = `${color}`;

        }


    })
    .catch(console.error);

const btn_envoyerPanier = document.getElementById('addToCart');
btn_envoyerPanier.addEventListener('click', (e) => {
    e.preventDefault();
})

// let optionProduit = {
//             id_produit:
//     color:
//            quantite:

// }





    // if (search_params.has('id')) {

//     console.log(search_params.get('id'))
// }


// let url = new URL(window.location.href);
// let search_params = url.searchParams;
// console.log(search_params.get('id'));

// let response = fetch('http://localhost:3000/api/service/${id}');
// let response = fetch('http://localhost:3000/api/products/{product-ID}');

// let response = await fetch(`http://localhost:3000/api/products/${id}`)
//    .then((response) => {
//        return response.json();
//    })


//https://stackoverflow.com/questions/54268951/react-fetchapi-how-to-take-data-from-related-json-by-id








