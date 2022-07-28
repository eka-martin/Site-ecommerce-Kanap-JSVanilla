// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
console.log('test');

fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log('test2', data);
        let elt = document.getElementById('items');
        for (const product of data) {
            const lien = document.createElement('a');
            lien.href = 'product.html?id=' + product._id;
            const art = document.createElement('article');
            art.innerHTML = product.name;
            lien.appendChild(art);
            elt.appendChild(lien);
        }
    })
    .catch(console.error);










