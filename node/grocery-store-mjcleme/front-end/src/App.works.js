import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [products, setProducts] = useState(null)
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [update, setUpdate] = useState(true);


  // get the cart
  const getCart = async () => {
    try {
      // we use axios to get the cart from the server
      const response = await axios.get("/api/cart");
      setItems(response.data);
    }
    catch (error) {
      // if an error occurs, we set that state here
      setError("Error getting the cart.");
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      await axios.put(`/api/cart/${item.id}/${item.quantity - 1}`);
      updateCart();
    }
    catch (error) {
      setError("Error updating quantity.");
    }
  }

  const increaseQuantity = async (item) => {
    try {
      await axios.put(`/api/cart/${item.id}/${item.quantity + 1}`);
      updateCart();
    }
    catch (error) {
      setError("Error updating quantity.");
    }
  }

  const deleteItem = async (item) => {
    try {
      await axios.delete(`/api/cart/${item.id}`);
      updateCart();
    }
    catch (error) {
      setError("Error deleting item from cart.");
    }
  }

  const addToCart = async (productID) => {
    try {
      await axios.post(`/api/cart/${productID}`);
      updateCart();
    }
    catch (error) {
      setError("Error adding product to cart.");
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    catch (error) {
      setError("error retrieving products: " + error);
    }
  }
  const createProduct = async () => {
    try {
      await axios.post("/api/products", { name: name, price: price });
    }
    catch (error) {
      setError("error adding a product: " + error);
    }
  }
  const deleteOneProduct = async (product) => {
    try {
      await axios.delete("/api/products/" + product.id);
    }
    catch (error) {
      setError("error deleting a product" + error);
    }
  }

  const updateCart = () => {
    setUpdate(true);
  }
  useEffect(() => {
    if (update) {
      getCart();
      setUpdate(false);
    }
  }, [update]);
  // fetch product data
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setName("");
    setPrice("");
  }

  const deleteProduct = async (product) => {
    await deleteOneProduct(product);
    fetchProducts();
  }
  if (products === null) return null;
  // render results
  return (
    <div className="App">
      {error}
      <h1>Cart</h1>
      {items.map( item => (
        <div key={item.id}>
          <p>{item.id}, {products[item.id].name}, {item.quantity} - 
          <button onClick={e => decreaseQuantity(item)}>-</button>
          <button onClick={e => increaseQuantity(item)}>+</button>
          <button onClick={e => deleteItem(item)}>Remove from cart</button>
          </p>
        </div>
      ))}  
      <h1>Products</h1>
      {products.map( product => (
        <div key={product.id}>
          <p>{product.id}, {product.name}, {product.price}
            <button onClick={e => addToCart(product.id)}>Add Cart</button>
          </p>
        </div>
      ))}  
    </div>
  );
}

export default App;
