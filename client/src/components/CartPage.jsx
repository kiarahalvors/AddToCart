function CartPage({ cart, fetchCart }) {
    const removeFromCart = (productId) => {
        fetch(`http://localhost:3000/cart/${productId}`, {
            method: 'DELETE',
        }).then(() => fetchCart());
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        fetch(`http://localhost:3000/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
        }).then(() => fetchCart());
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container">
            <h1>Cart</h1>
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <span className="item-title">{item.name}</span>
                                <span className="item-price">Rs{item.price}</span>
                                <div className="qty">
                                    <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                                </div>
                                <span className="item-total">Rs{item.price * item.quantity}</span>
                                <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <strong>Total: Rs{total}</strong>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;