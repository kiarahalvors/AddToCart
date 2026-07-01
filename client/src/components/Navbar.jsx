function Navbar({ cartCount }) {
  return (
    <div className="navbar">
      <h1>Kiara</h1>
      <div className="cart">
        <span>{cartCount}</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="cart"
        />
      </div>
    </div>
  );
}

export default Navbar;