import { createContext, useState } from "react";

const UserDropDownContext = createContext();

const UserDropDownContextProvider = ({ children }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <UserDropDownContext.Provider value={{isOpen,setIsOpen}}>
      {children}
    </UserDropDownContext.Provider>
  );
};

export { UserDropDownContext, UserDropDownContextProvider };
