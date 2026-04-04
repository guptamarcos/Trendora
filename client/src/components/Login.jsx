import { Link , useNavigate} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas/LoginSchema.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { login } from "../api/authApi.js";

// REUSABLE BACK NAVIGATION BUTTON COMPONENT
function BackBtn() {
  return (
    <Link to="/trendora"
      className="absolute top-12 left-12 px-4 py-2 rounded-lg border-2 border-gray-400 flex items-center"
    >
      <FaArrowLeft style={{ paddingRight: "0.25rem" }} /> Back
    </Link>
  );
}

// SHARED TAILWIND STYLES FOR INPUT FIELDS
const inputStyling = `w-full border-2 border-gray-300 rounded-md mt-1 py-[0.6rem] px-[0.4rem]`;
const buttonStyling = `w-full text-lg bg-amber-400 cursor-pointer py-[0.5rem] rounded-md my-4`;
const formStyling = `w-[32%] border-2 border-gray-300 shadow-lg px-10 py-12 rounded-lg`;

function Login() {
  
  const { register , handleSubmit, formState: {errors} } = useForm({resolver:zodResolver(LoginSchema)});
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  async function formData(data){
    try{
      await login({ email: data.email, password: data.password }); 
      getUser();
      toast.success("Welcome back! You're now logged in.");
      navigate("/trendora");
    }catch(err){
      const message = err?.response?.data?.message || "Something went Wrong !!";
      toast.error(message);
    }
  }

  return (
    // MAIN CONTAINER: CENTERS FORM VERTICALLY AND HORIZONTALLY
    <main className="h-screen flex justify-center items-center">
      
      {/* LOGIN FORM CONTAINER */}
      <form className={formStyling} onSubmit={handleSubmit(formData)}>
        
        {/* FORM HEADING */}
        <h1 className="text-center text-4xl font-bold mb-6">LogIn</h1>
        
        {/* EMAIL INPUT FIELD */}
        <div className="py-2">
          <label htmlFor="email" className="text-xl">Email</label> <br />
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            className={inputStyling}
            {...register("email")}
          />
            {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
        </div>
        
        {/* PASSWORD INPUT FIELD */}
        <div className="py-2">
          <label htmlFor="password" className="text-xl">Password</label> <br />
          <input
            id="password"
            type="password"
            placeholder="Enter Your Password"
            className={inputStyling}
            {...register("password")}
          />
          {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
        </div>

        {/* SUBMIT BUTTON */}
        <button className={buttonStyling}>LogIn</button>

        {/* REDIRECT LINK TO SIGNUP PAGE */}
        <h6 className="text-center text-lg">
          Don't have an account?{" "}
          <Link to="/trendora/signup" className="text-blue-600">
            Sign Up
          </Link>
        </h6>

      </form>
      
      {/* BACK BUTTON COMPONENT */}
      <BackBtn />
    </main>
  );
}

export default Login;