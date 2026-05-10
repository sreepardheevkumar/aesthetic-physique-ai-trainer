import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIndexedDB } from '../hooks/useIndexedDB';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: profileData, putData: setProfileDataDB, loading } = useIndexedDB('userProfile', 'main');
  const [userProfile, setUserProfile] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (profileData) {
        setUserProfile(profileData);
        setIsOnboarded(true);
      } else {
        setIsOnboarded(false);
      }
    }
  }, [profileData, loading]);

  const saveProfile = async (data) => {
    await setProfileDataDB(data);
    setUserProfile(data);
    setIsOnboarded(true);
  };

  const resetProfile = async () => {
    await setProfileDataDB(null);
    setUserProfile(null);
    setIsOnboarded(false);
  };

  return (
    <AppContext.Provider value={{ userProfile, saveProfile, resetProfile, isOnboarded, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
