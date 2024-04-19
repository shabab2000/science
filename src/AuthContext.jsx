import React, { createContext, useContext, useState } from 'react';

// สร้าง Context สำหรับการจัดการสถานะการเข้าสู่ระบบ
const AuthContext = createContext();

// สร้าง Provider สำหรับ AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// สร้าง Custom Hook สำหรับการเข้าถึงข้อมูลการเข้าสู่ระบบ
export const useAuth = () => useContext(AuthContext);
