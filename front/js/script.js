// https://developer.mozilla.org/en-US/docs/Web/API/Response/json

fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (const product of data.products) {
            const listItem = document.createElement('a');
            let elt = document.getElementById('items');
            elt.appendChild(listItem);
        }
    })
    .catch(console.error);










