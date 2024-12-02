"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliersData, setSuppliersData] = useState([]); // Store the list of all suppliers
  const [error, setError] = useState(null); // Store any fetch error

  useEffect(() => {
    const fetchSuppliersData = async () => {
      try {
        const response = await fetch('/api/suppliers'); // Updated API endpoint
        const data = await response.json();

        if (response.ok) {
          setSuppliersData(data.suppliers || []); // Set the list of suppliers or default to empty
        } else {
          console.error('Failed to fetch suppliers:', data.error);
          setError(data.error || 'Unknown error occurred'); // Capture error message
          setSuppliersData([]);
        }
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        setError('Failed to fetch supplier data');
        setSuppliersData([]);
      }
    };

    fetchSuppliersData();
  }, []);

  return (
    <SupplierContext.Provider value={{ suppliersData, error, setSuppliersData }}>
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);
  
  // If context is undefined (in case it's not wrapped properly), return a default value
  if (!context) {
    throw new Error('useSupplierContext must be used within a SupplierProvider');
  }

  return context;
};
