import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { LoginSchema } from "../schemas/LoginSchema.js";
import { login, oauthLogin } from "../api/authApi.js";
import Loader from "./loaders/Loader.jsx";
import { UserContext } from "../context/UserContext.jsx";

// REUSABLE COMPONENTS

function BackBtn() {
  return (
    <Link
      to="/trendora"
      className="absolute top-8 left-8 px-3 py-2 rounded-lg border-2 border-gray-400 flex items-center gap-2 hover:bg-gray-100 transition"
    >
      <FaArrowLeft />
      Back
    </Link>
  );
}

function FormInput({ id, label, type, placeholder, register, error }) {
  return (
    <div className="py-2">
      <label htmlFor={id} className="text-lg font-medium">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full border-2 border-gray-300 rounded-md mt-1 py-2 px-3 outline-none focus:border-amber-400 transition"
        {...register}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

// STYLES

const styles = {
  form: "w-full max-w-[420px] border border-gray-300 shadow-lg px-10 py-8 rounded-xl bg-white",

  button:
    "w-full text-base bg-amber-400 hover:bg-amber-500 transition cursor-pointer py-2.5 rounded-md my-4 font-medium",
};

// MAIN COMPONENT

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getUser } = useContext(UserContext);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  // HANDLE NORMAL LOGIN
  async function handleLogin(data) {
    try {
      setLoading(true);

      const result = await login({
        email: data.email,
        password: data.password,
      });

      const isAdmin = data.email.toLowerCase() === "admin@gmail.com";

      if (isAdmin) {
        await getUser();
        navigate("/trendora/admin");
        return;
      }

      if (!isAdmin && result?.data?.success) {
        navigate("/trendora/auth/verify-otp", {
          state: {
            email: data.email,
          },
        });
        return;
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      setLoading(false);
    }
  }

  // HANDLE GOOGLE LOGIN
  async function handleGoogleSuccess(credentialResponse) {
    try {
      setLoading(true);
      const token = credentialResponse.credential;
      const result = await oauthLogin(token);

      if (result?.data?.success) {
        navigate("/trendora/auth/verify-otp", {
          state: {
            email: result?.data?.email,
          },
        });
      }
    } catch (error) {
      toast.error("Google login failed!");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message, {
        toastId: "otp-session",
      });
    }
  }, [location.state]);

  
  // SHOW LOADING SKELETON
  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      {/* LOGIN FORM */}
      <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
        {/* HEADING */}
        <h1 className="text-center text-3xl font-bold mb-5">Login</h1>

        {/* EMAIL */}
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          error={errors.email}
        />

        {/* PASSWORD */}
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password}
        />

        {/* LOGIN BUTTON */}
        <button type="submit" className={styles.button}>
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/trendora/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* DIVIDER */}
        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-3 text-gray-500 text-sm">OR</span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed!")}
            text="signin_with"
          />
        </div>
      </form>

      {/* BACK BUTTON */}
      <BackBtn />
    </main>
  );
}

export default Login;
