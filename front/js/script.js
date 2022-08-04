// https://developer.mozilla.org/en-US/docs/Web/API/Response/json


fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        let elt = document.getElementById('items');
        elt.classList.add('items');
        for (const product of data) {
            const lien = document.createElement('a');
            const art = document.createElement('article');
            const image = document.createElement('img');
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            const name = document.createElement('h3');
            name.innerHTML = product.name;
            const des = document.createElement('p');
            des.innerHTML = product.description;
            lien.appendChild(art);
            art.appendChild(image);
            art.appendChild(name);
            elt.appendChild(lien);
            art.appendChild(des);

            des.classList.add('productDescription');
            name.classList.add('productName');
            lien.href = 'product.html?id=' + product._id;


        }
    })
    .catch(console.error);














