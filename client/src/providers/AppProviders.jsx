import { UserDropDownContextProvider, UserContextProvider  } from "../context/Index.jsx";

function AppProviders({ children }) {
  return (
    <UserDropDownContextProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </UserDropDownContextProvider>
  );
}

export { AppProviders };
