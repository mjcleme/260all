import axios from "axios";

// This is a simple component that just displays a product.
export function Product(props) {
  const { product, setError, updateCart } = props;

  const addToCart = async (productID) => {
    try {
      await axios.post(`/api/cart/${productID}`);
      updateCart();
    } catch (error) {
      setError("Error adding product to cart.");
    }
  };

  return (
    <div className="product">
      <p>
        {product.name}, {product.price}
        <button onClick={e => addToCart(product.id)}>Add to Cart</button>
      </p>
    </div>
  );
}