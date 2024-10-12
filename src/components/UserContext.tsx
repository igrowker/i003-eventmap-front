"use client"; // Añade esta línea al principio
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  cuil: string;
  rol: string;
  state: boolean;
  events: any[];
}

interface UserContextProps {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Almacena en localStorage cuando el perfil cambia
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    // Carga el perfil desde localStorage si está presente
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
