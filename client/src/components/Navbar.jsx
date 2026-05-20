import { NavLink } from "react-router-dom";
import { FiUserPlus, FiLogIn } from "react-icons/fi";
import { FaUserAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { UserDropDown } from "./Index.jsx";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/Index.jsx";

function Navbar() {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(UserContext);

  const itemsInCart = user?.cart?.length;
  const itemsInWishlist = user?.wishlist?.length === 0;

  return (
    <header className="h-[10vh] w-full px-[7.5vw] bg-white fixed top-0 left-0 z-10">
      <nav className="h-full flex justify-between items-center border-b-2 border-gray-300">
        {/* WEBSITE LOGO  */}
        <h1 className="font-semibold font-heading text-4xl">Trendora</h1>

        {/* WEBSITE LINKS */}
        <div className="w-[25%] flex justify-between">
          <NavLink
            to="/trendora"
            end
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-black" : "text-gray-500"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/trendora/collections"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-black" : "text-gray-500"}`
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/trendora/about"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-black" : "text-gray-500"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/trendora/contact"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-black" : "text-gray-500"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* OPTIONS BEFORE LOGIN  */}
        {(!user || user?.role === "admin") && (
          <div>
            <NavLink
              to="/trendora/login"
              className="bg-transparent text-base mr-2 border px-[0.8rem] py-[0.5rem] rounded-xl border-[#CBD5E1] text-[#374151] hover:bg-[#F1F5F9] hover:text-[#1D4ED8]"
            >
              <FiLogIn className="inline-block mr-2 text-xl" />
              Log In
            </NavLink>
            <NavLink
              to="/trendora/signup"
              className="bg-[#2563EB] text-base text-[#FFFFFF] px-[0.8rem] py-[0.55rem] rounded-xl hover:bg-[#1E40AF]"
            >
              <FiUserPlus className="inline-block mr-2 text-xl" />
              Get Started
            </NavLink>
          </div>
        )}

        {/* OPTIONS AFTER LOGIN */}
        {user && user?.role !== "admin" && (
          <div className="flex items-center gap-8 relative">
            <NavLink to="/trendora/cart">
              <HiOutlineShoppingBag size={26} color="black" />
            </NavLink>
            {itemsInCart !== 0 && (
              <p className="absolute bg-black text-xs text-white left-4 top-4 rounded-[50%] px-1 flex justify-center items-center">
                {itemsInCart}
              </p>
            )}
            <NavLink to="/trendora/wishlist">
              {itemsInWishlist && <FaRegHeart size={24} color="black" />}
              {!itemsInWishlist && <FaHeart size={24} color="black" />}
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              ref={buttonRef}
              className="cursor-pointer"
            >
              <FaUserAlt size={24} color="black" />
            </button>
          </div>
        )}
      </nav>

      <UserDropDown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonRef={buttonRef}
      />
    </header>
  );
}

export default Navbar;
