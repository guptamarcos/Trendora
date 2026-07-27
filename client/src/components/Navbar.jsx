import { NavLink } from "react-router-dom";
import { FiUserPlus, FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { FaUserAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { UserDropDown } from "./Index.jsx";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/Index.jsx";

function Navbar() {
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useContext(UserContext);

  const itemsInCart = user?.cart?.length;
  const itemsInWishlist = user?.wishlist?.length === 0;

  return (
    <header className="w-full px-4 sm:px-8 lg:px-[7.5vw] bg-white fixed top-0 left-0 z-50">
      <nav className="h-[10vh] flex justify-between items-center border-b-2 border-gray-300">

        <h1 className="font-semibold font-heading text-2xl sm:text-3xl lg:text-4xl">
          Trendora
        </h1>

        <div className="hidden lg:flex w-[30%] justify-between">
          <NavLink to="/trendora" className="text-lg">Home</NavLink>

          <NavLink to="/trendora/collections" className="text-lg">
            Collection
          </NavLink>

          <NavLink to="/trendora/about" className="text-lg">
            About
          </NavLink>

          <NavLink to="/trendora/contact" className="text-lg">
            Contact
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center">
          {(!user || user?.role === "admin") && (
            <>
              <NavLink
                to="/trendora/login"
                className="bg-transparent text-base mr-2 border px-3 py-2 rounded-xl border-[#CBD5E1] text-[#374151]"
              >
                <FiLogIn className="inline mr-2" />
                Log In
              </NavLink>

              <NavLink
                to="/trendora/signup"
                className="bg-[#2563EB] text-white px-3 py-2 rounded-xl"
              >
                <FiUserPlus className="inline mr-2" />
                Get Started
              </NavLink>
            </>
          )}

          {user && user?.role !== "admin" && (
            <div className="flex items-center gap-8 relative">
              <NavLink to="/trendora/cart">
                <HiOutlineShoppingBag size={26} />
              </NavLink>

              {itemsInCart !== 0 && (
                <p className="absolute bg-black text-xs text-white left-4 top-4 rounded-full px-1">
                  {itemsInCart}
                </p>
              )}

              <NavLink to="/trendora/wishlist">
                {itemsInWishlist ? (
                  <FaRegHeart size={24} />
                ) : (
                  <FaHeart size={24} />
                )}
              </NavLink>

              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaUserAlt size={24} />
              </button>
            </div>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 py-4 space-y-4">
          <NavLink
            to="/trendora"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/trendora/collections"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </NavLink>

          <NavLink
            to="/trendora/about"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/trendora/contact"
            className="block"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

          {(!user || user?.role === "admin") && (
            <>
              <NavLink
                to="/trendora/login"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/trendora/signup"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </NavLink>
            </>
          )}

          {user && user?.role !== "admin" && (
            <div className="flex gap-6 items-center">
              <NavLink to="/trendora/cart">
                <HiOutlineShoppingBag size={25} />
              </NavLink>

              <NavLink to="/trendora/wishlist">
                {itemsInWishlist ? (
                  <FaRegHeart size={22} />
                ) : (
                  <FaHeart size={22} />
                )}
              </NavLink>

              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaUserAlt size={22} />
              </button>
            </div>
          )}
        </div>
      )}

      <UserDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonRef={buttonRef}
      />
    </header>
  );
}

export default Navbar;