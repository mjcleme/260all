import { useState, useEffect } from "react";
import axios from "axios";

// We use two components, which are in src/components.
import { Error } from "./components/Error.js";
import { Product } from "./components/Product.js";
import { Cart } from "./components/Cart.js";

import "./App.css";

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState(true);

  const [error, setError] = useState("");

  // get all of the products
  const getProducts = async () => {
    try {
      // we use axios to get the products from the server
      const response = await axios.get("/api/products");
      const sorted_products = response.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setProducts(sorted_products);
    } catch (error) {
      // if an error occurs, we set that state here
      setError("Error getting the products.");
    }
  };

  // get the cart
  const getCart = async () => {
    try {
      // we use axios to get the cart from the server
      const response = await axios.get("/api/cart");
      setItems(response.data);
    } catch (error) {
      // if an error occurs, we set that state here
      setError("Error getting the products.");
    }
  };

  const updateCart = () => {
    setUpdate(true);
  }

  // useEffect() is a hook that will run whenever the component is rendered. Here we tell it that if the update state is true, then we need to get the questions from the server. Notice that update is set to true when initialized, so we can get the questions on the first render (when the page is loaded). We set update to false after getting the questions.

  // We also list update as a dependency in the second argument to useEffect -- [update]. This means that React will rerun this effect whenever the update state variable changes. Now any other function can set update to true and that will cause the component to get the questions again.
  useEffect(() => {
    if (update) {
      getCart();
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <Error error={error} />
      <div className="flex">
        <div>
          <h1>Products</h1>
          {products.map((product) => (
            <Product key={product.id} product={product} updateCart={updateCart} />
          ))}
        </div>
        <div>
          <h1>Cart</h1>
          <Cart items={items} setError={setError} updateCart={updateCart} />
        </div>
      </div>
    </div>
  );
}

export default App;