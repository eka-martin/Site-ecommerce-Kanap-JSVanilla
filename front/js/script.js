// https://developer.mozilla.org/en-US/docs/Web/API/Response/json


fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('test2', data);
        let elt = document.getElementById('items');
        elt.classList.add('items');
        for (const product of data) {
            const lien = document.createElement('a');
            lien.href = 'product.html?id=' + product._id;
            const art = document.createElement('article');
            const name = document.createElement('h3');
            name.innerHTML = product.name;
            const des = document.createElement('p');
            des.innerHTML = product.description;
            const image = document.createElement('img');
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            lien.appendChild(art);
            art.appendChild(name);
            elt.appendChild(lien);
            art.appendChild(des);
            art.appendChild(image);
            des.classList.add('productDescription');

        }
    })
    .catch(console.error);










