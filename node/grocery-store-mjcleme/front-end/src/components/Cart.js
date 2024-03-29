import Item from './Item.js'

// Display a cart
export function Cart(props) {
    const { items, setError, updateCart } = props;
    return (
        <div>
            {items.map(item => (
                <Item item={item} setError={setError} updateCart={updateCart} key={item.id} />
            ))}
        </div>
    )

}