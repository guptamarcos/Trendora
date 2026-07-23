import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function NotFound() {
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-8xl font-bold text-black">404</h1>

      <h2 className="mt-4 text-3xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-3 text-gray-500 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to={isAdmin ? "/trendora/admin" : "/trendora"}
          className="px-6 py-3 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Go Home
        </Link>

        {isAdmin ? (
          ""
        ) : (
          <Link
            to="/trendora/collections"
            className="px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
}

export default NotFound;
