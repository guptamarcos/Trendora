import { Link,useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";

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

// SHARED TAILWIND STYLES 
const inputStyling = `w-full border-2 border-gray-300 rounded-md mt-1 py-[0.6rem] px-[0.4rem]`;
const buttonStyling = `w-full text-lg bg-amber-400 cursor-pointer py-[0.5rem] rounded-md my-4`;
const formStyling = `w-[32%] border-2 border-gray-300 shadow-lg px-10 py-12 rounded-lg`;

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(SignupSchema)});
  const navigate = useNavigate();

  async function formData(data){
    try{
      const res1 = await axios.post("http://localhost:8080/api/auth/register", data);
      toast.success("User Registered Successfully"); 
      console.log("email", res1?.data?.user?.email, "password", res1?.data?.user?.password)
      const res2 = await axios.post("http://localhost:8080/api/auth/login", {email: res1?.data?.user?.email, password: res1?.data?.user?.password});
      toast.success("User login Successfully"); 
      navigate("/trendora");
    }catch(err){
      console.log(err);
    }
  }

  return (
    // MAIN CONTAINER: CENTERS THE FORM BOTH VERTICALLY AND HORIZONTALLY
    <main className="h-screen flex justify-center items-center">
      
      {/* SIGNUP FORM CONTAINER */}
      <form className={formStyling} onSubmit={handleSubmit(formData)}>

        {/* FORM HEADING */}
        <h1 className="text-center text-4xl font-bold mb-6">Signup</h1>

        {/* USERNAME FIELD */}
        <div className="py-2">
          <label htmlFor="username" className="text-xl">Username</label> <br />
          <input
            id="username"
            type="text"
            placeholder="Enter Your Username"
            className={inputStyling}
            required
            {...register("username")}
          />
          {errors.username && (<p className="text-red-500 text-sm">{errors.username.message}</p>)}
        </div>

        {/* EMAIL FIELD */}
        <div className="py-2">
          <label htmlFor="email" className="text-xl">Email</label> <br />
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            className={inputStyling}
            required
            {...register("email")}
          />
          {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
        </div>

        {/* PASSWORD FIELD */}
        <div className="py-2">
          <label htmlFor="password" className="text-xl">Password</label><br />
          <input 
            id="password"
            type="password"
            placeholder="Enter Your Password"
            className={inputStyling}
            required
            {...register("password")}
          />
          {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
        </div>

        {/* SUBMIT BUTTON */}
        <button className={buttonStyling}>Register</button>

        {/* REDIRECT TO LOGIN PAGE */}
        <h6 className="text-center text-lg">
          Already have an account?{" "}
          <Link to="/trendora/login" className="text-blue-600">
            LogIn
          </Link>
        </h6>
      </form>

      {/* BACK NAVIGATION BUTTON */}
      <BackBtn />
    </main>
  );
}

export default Signup;