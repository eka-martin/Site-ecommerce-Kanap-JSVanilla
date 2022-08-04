
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
        id_produit: id,
        color: document.getElementById('colors').selectedOptions[0].value,
        quantite: document.getElementById('quantity').value,

    }
    console.log(optionProduit);

    // https://fullstackheroes.com/tutorials/javascript/local-storage/

    let produitEnregistreDansLocalStorage = JSON.parce(localStorage.getItem('produit'));
    if (produitEnregistreDansLocalStorage) {
        produitEnregistreDansLocalStorage.push(optionProduit);
        localStorage.setItem('produit', JSON.stringify(produitEnregistreDansLocalStorage));

        console.log(produitEnregistreDansLocalStorage);
    }
    else {
        produitEnregistreDansLocalStorage = [];
        produitEnregistreDansLocalStorage.push(optionProduit);
        localStorage.setItem('produit', JSON.stringify(produitEnregistreDansLocalStorage));

        console.log(produitEnregistreDansLocalStorage);

    }
})









//https://stackoverflow.com/questions/54268951/react-fetchapi-how-to-take-data-from-related-json-by-id








