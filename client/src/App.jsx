import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Products from './components/Products'
import CartPage from './components/CartPage'

function App() {
  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    fetch('http://localhost:3000/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Products fetchCart={fetchCart} />
      <CartPage cart={cart} fetchCart={fetchCart} />
    </>
  )
}

export default App