const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRoutes);

module.exports = app;

////////////////////////////////

// https://developer.mozilla.org/en-US/docs/Web/API/Response/json

fetch('http://localhost:3000/api/products')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (const product of data.products) {
            const listItem = document.createElement('li');
            listItem.appendChild(
                document.createElement('strong')
            ).textContent = product.Name;
            listItem.append(
                ` can be found in ${product.Location
                }. Cost: `
            );
            listItem.appendChild(
                document.createElement('strong')
            ).textContent = `£${product.Price}`;
            myList.appendChild(listItem);
        }
    })
    .catch(console.error);










