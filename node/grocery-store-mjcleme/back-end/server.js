// Server for a basic shopping site

const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

let products = [];
let cart = [];
let id = 0;

// get a list of all products
app.get("/api/products", (req, res) => {
  res.send(products);
});

// get a specific product
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);
  if (!product) {
    res.sendStatus(404);
    return;
  }
  res.send(product);
});

// create a product
app.post("/api/products", (req, res) => {
  const product = {
    id: toString(id),
    name: req.body.name,
    price: req.body.price,
  };
  id += 1;
  products.push(product);
  res.send(product);
});

// delete a product
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter((product) => product.id != id);
  res.sendStatus(200);
});

// get the shopping cart
app.get("/api/cart", (req, res) => {
  res.send(cart);
});

// add an item to the cart
app.post("/api/cart/:id", (req, res) => {
  const id = req.params.id;
  console.log("Adding to Cart "+id);
    const item = {
      id: id,
      quantity: 1,
    };
    const foundItem = cart.find(item => item.id == id);

    if (foundItem) {
      var index = cart.indexOf(foundItem);
      cart[index].quantity +=1;
      item.quantity = cart[index].quantity;
    } else {
      cart.push(item);
    }
    res.send(item);
    return
});

// edit the quantity of an item in the cart
app.put("/api/cart/:id/:quantity", (req, res) => {
  const id = req.params.id;
  const quantity = parseInt(req.params.quantity);

  const foundItem = cart.find(item => item.id == id);
  console.log(foundItem);
  if (!foundItem) {
    res.sendStatus(404);
    return;
  }
  console.log(cart);
  foundItem.quantity = quantity;
  if (foundItem.quantity <= 0) {
    cart = cart.filter((item) => item.id != id);
  }
  console.log("After Modification");
  console.log(cart);
  res.send(foundItem);
  /*
  const foundIndex = cart.findIndex((item) => {
    return item.id == id;
  });
  if (foundIndex == -1) {
    // if we get here, the item was not in the cart
    res.sendStatus(404);
    return;
  }
  // update the quantity
  cart[foundIndex].quantity = quantity;
  res.send(cart[foundIndex]);
  */
});

// delete an item from the cart
app.delete("/api/cart/:id", (req, res) => {
  const id = req.params.id;
  cart = cart.filter((item) => item.id != id);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server listening on port 3000!"));