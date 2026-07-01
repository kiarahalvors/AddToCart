import { useState, useEffect } from 'react';

function Products({ fetchCart }) {
    const [products, setProducts] = useState([]);

    const imageUrl = "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9"

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (product) => {
        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: product.id }),
        }).then(() => fetchCart());
    };

    return (
        <div className="container">
            <h1>Products</h1>
            <ul className="products-grid">
                {products.map(product => (
                    <li key={product.id} className="product-card">
                        <img src={imageUrl} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <div className="price">Rs{product.price}</div>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;