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
  type NewDestinationInitialValuesType,
  type NewDestinationType,
  newDestinationInitialValuesSchema,
} from '@/schemas/destination';

const defaultDestination: NewDestinationInitialValuesType = {
  name: '',
  age: 0,
  technology_id: '',
  perpetrator_id: '',
  photo_id: '',
  photo_url: '',
};

const LOCAL_STORAGE_KEY = 'multi-page-form-newDestinationData' as const;

type AddDestinationContextType = {
  newDestinationData: NewDestinationInitialValuesType;
  updateNewDestinationDetails: (destinationDetails: Partial<NewDestinationType>) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
};

export const AddDestinationContext = createContext<AddDestinationContextType | null>(null);

export const AddDestinationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newDestinationData, setNewDestinationData] =
    useState<NewDestinationInitialValuesType>(defaultDestination);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newDestinationData);
    }
  }, [newDestinationData, dataLoaded]);

  const updateNewDestinationDetails = useCallback(
    (destinationDetails: Partial<NewDestinationType>) => {
      setNewDestinationData({ ...newDestinationData, ...destinationDetails });
    },
    [newDestinationData]
  );

  const saveDataToLocalStorage = (
    currentDestinationData: NewDestinationInitialValuesType
  ) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentDestinationData));
  };

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString) return setNewDestinationData(defaultDestination);
    const validated = newDestinationInitialValuesSchema.safeParse(
      JSON.parse(loadedDataString)
    );
    
    if (validated.success) {
      setNewDestinationData(validated.data);
    } else {
      setNewDestinationData(defaultDestination);
    }
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewDestinationData(defaultDestination);
  };

  const contextValue = useMemo(
    () => ({
      newDestinationData: newDestinationData,
      dataLoaded,
      updateNewDestinationDetails: updateNewDestinationDetails,
      resetLocalStorage,
    }),
    [newDestinationData, dataLoaded, updateNewDestinationDetails]
  );

  return (
    <AddDestinationContext.Provider value={contextValue}>
      {children}
    </AddDestinationContext.Provider>
  );
};

export function useAddDestinationContext() {
  const context = useContext(AddDestinationContext);
  if (context === null) {
    throw new Error(
      'useAddDestinationContext must be used within a AddDestinationContextProvider'
    );
  }
  return context;
}
