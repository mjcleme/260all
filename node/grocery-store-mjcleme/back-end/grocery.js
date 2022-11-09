const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

let products = [];
let cart = [];
let id = 0;

app.get('/api/cart', (req, res) => {
  console.log("In cart get");
  res.send(cart);
});

app.post('/api/cart/:id', (req, res) => {
  console.log("In cart post");
  id = req.params.id;
  const foundItem = cart.find(item => item.id == id);
  if(foundItem) {
    foundItem.quantity += 1;
    res.send(foundItem);
  } else {
    let item = {
      id: id,
      quantity: 1
    };
    cart.push(item);
    res.send(item);
  }
});

app.get('/api/products', (req, res) => {
  console.log("In get");
  res.send(products);
});

app.post('/api/products', (req, res) => {
  console.log("In post");
  id = id + 1;
  let product = {
    id: id,
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.send(product);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));