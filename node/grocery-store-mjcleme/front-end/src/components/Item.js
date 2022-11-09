import { useState, useEffect } from "react";

import axios from 'axios';


// Display an Item
export default function Item(props) {
    const [product, setProduct] = useState([]);
    const { item, setError, updateCart } = props;

    const decreaseQuantity = async (item) => {
        try {
            await axios.put(`/api/cart/${item.id}/${item.quantity - 1}`);
            updateCart();
        } catch (error) {
            setError("Error updating quantity.");
        }
    }

    const increaseQuantity = async (item) => {
        try {
            await axios.put(`/api/cart/${item.id}/${item.quantity + 1}`);
            updateCart();
        } catch (error) {
            setError("Error updating quantity.");
        }
    }

    const deleteItem = async (item) => {
        try {
            await axios.delete(`/api/cart/${item.id}`);
            updateCart();
        } catch (error) {
            setError("Error deleting item from cart.");
        }
    }

    useEffect(() => {
        // get  the products
        const getProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${item.id}`);
                setProduct(response.data);
            } catch (error) {
                // if an error occurs, we set that state here
                setError("Error getting a product.");
            }
        };

        getProduct();
    }, [item, setError]);

    return (<div>{product.name}, {item.quantity} <button onClick={e => decreaseQuantity(item)}>-</button><button onClick={e => increaseQuantity(item)}>+</button><button onClick={e => deleteItem(item)}>Remove from cart</button></div>)
}