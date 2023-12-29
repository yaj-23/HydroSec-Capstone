import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [isAdmin, setIsAdmin] = useState(false);

    const setLoggedUser = (user) => {
        setUser(user);
    };

    const setAdminStatus = (isAdmin) => {
        setIsAdmin(isAdmin);
    }
    
    return (
        <AuthContext.Provider value={{ user, setLoggedUser, isAdmin, setAdminStatus }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => {
    let context = useContext(AuthContext);
    if(!context){
        throw new Error("useUser must be used inside AuthContextProvider!");
    }
    return context;
}