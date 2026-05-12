import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function UserProtectedRoutes() {
  const { user } = useContext(UserContext);
  const userRole = user?._doc?.role;

  if (!user) {
    return <Navigate to="/trendora/login" replace />;
  }
  
  if(user?.role === "admin"){
    return <Navigate to="/trendora/admin" replace />
  }

  return <Outlet />;
}

export function AdminProtectedRoutes() {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/trendora/login" replace />;
  }

  if(user?.role === "user"){
    return <Navigate to="/trendora" replace />
  }

  return <Outlet />;
}

export function CheckUserAuth(){
    const { user } = useContext(UserContext);

    if(user && user?.role === "user"){
        return <Navigate to="/trendora" replace/>
    }
    
    if(user && user?.role === "admin"){
        return <Navigate to="/trendora/admin" replace/>
    }

    return <Outlet/>;
}