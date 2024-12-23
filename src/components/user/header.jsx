import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons"; // Import search icon

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartQuantity(storedCart.reduce((acc, item) => acc + item.quantity, 0));

    window.addEventListener("storage", updateCartQuantity);
    return () => window.removeEventListener("storage", updateCartQuantity);
  }, []);

  const updateCartQuantity = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartQuantity(storedCart.reduce((acc, item) => acc + item.quantity, 0));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownVisible(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchQuery("");
      navigate(`/all-product/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold">X-Shop</div>
          <div className="text-gray-600">ONLINE SHOPPING</div>
        </Link>
        <ul className="flex space-x-4">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/man-product">Men</Link>
          </li>
          <li className="nav-item">
            <Link to="/women-product">Women</Link>
          </li>
          <li className="nav-item">
            <Link to="/kids-product">Kids</Link>
          </li>
          <li className="nav-item">
            <Link to="/unisex-product">Unisex</Link>
          </li>
          <li className="nav-item">
            <Link to="/all-product">All Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="relative flex items-center space-x-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              className="px-2 py-1 outline-none"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-3 bg-gray-100 text-gray-600"
              onClick={handleSearch}
            >
              <SearchOutlined />
            </button>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative">
                <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartQuantity}
                </span>
              </Link>
              <span
                className="cursor-pointer text-gray-700"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                {user.fullname}
              </span>
              {dropdownVisible && (
                <div className="absolute right-0 top-6 mt-2 w-48 bg-white shadow-lg rounded-md z-[9999]">
                  <ul className="py-2">
                    <li onClick={() => setDropdownVisible(false)}>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Profile
                      </Link>
                    </li>
                    <li onClick={() => setDropdownVisible(false)}>
                      <Link
                        to="/shipping-address"
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Shipping Information
                      </Link>
                    </li>
                    <li onClick={() => setDropdownVisible(false)}>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Orders
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
              <Link to="/register" className="text-blue-500">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
