import { UserDropDownContextProvider } from "../context/UserDropdownContext";

function AppProviders({children}){
    return (
        <UserDropDownContextProvider>
            {children}
        </UserDropDownContextProvider>

    )
};

export { AppProviders };