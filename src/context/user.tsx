'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type UserDataInitialValuesType,
  type UserDataType,
  userDataInitialValuesSchema,
} from '@/schemas/userData';
import { nanoid } from 'nanoid';

const defaultUserData: UserDataInitialValuesType = {
  id: nanoid(),
  devstinationSlug: '',
};

const LOCAL_STORAGE_KEY = 'userData' as const;

type UserDataContextType = {
  userData: UserDataInitialValuesType;
  updateUserData: (userDataDetails: Partial<UserDataType>) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
};

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] =
    useState<UserDataInitialValuesType>(defaultUserData);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(userData);
    }
  }, [userData, dataLoaded]);

  const updateUserData = useCallback(
    (userDataDetails: Partial<UserDataType>) => {
      setUserData({ ...userData, ...userDataDetails });
    },
    [userData]
  );

  const saveDataToLocalStorage = (
    currentUserData: UserDataInitialValuesType
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUserData));
  };

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString) return setUserData(defaultUserData);
    const validated = userDataInitialValuesSchema.safeParse(
      JSON.parse(loadedDataString)
    );
    
    if (validated.success) {
      setUserData(validated.data);
    } else {
      setUserData(defaultUserData);
    }
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserData(defaultUserData);
  };

  const contextValue = useMemo(
    () => ({
      userData: userData,
      dataLoaded,
      updateUserData: updateUserData,
      resetLocalStorage,
    }),
    [userData, dataLoaded, updateUserData]
  );

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (context === null) {
    throw new Error(
      'useUserDataContext must be used within a UserDataContextProvider'
    );
  }
  return context;
}
