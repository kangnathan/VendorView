"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]); // Store the list of all products
  const [error, setError] = useState(null); // Store any fetch error

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch('/api/products'); // Updated API endpoint for products
        const data = await response.json();

        if (response.ok) {
          setProductsData(data.products || []); // Set the list of products or default to empty
        } else {
          console.error('Failed to fetch products:', data.error);
          setError(data.error || 'Unknown error occurred'); // Capture error message
          setProductsData([]); 
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to fetch product data');
        setProductsData([]); 
      }
    };

    fetchProductsData();
  }, []);

  return (
    <ProductContext.Provider value={{ productsData, error, setProductsData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  
  // If context is undefined (in case it's not wrapped properly), return a default value
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return context;
};
