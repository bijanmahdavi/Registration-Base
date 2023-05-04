import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUserRegistration = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleUserRegistration }}>
      <React.Fragment>{children}</React.Fragment>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
