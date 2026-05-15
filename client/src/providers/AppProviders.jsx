import {
  UserDropDownContextProvider,
  UserContextProvider,
} from "../context/Index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function AppProviders({ children }) {
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
      <UserDropDownContextProvider>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </UserDropDownContextProvider>
    </GoogleOAuthProvider>
  );
}

export { AppProviders };
