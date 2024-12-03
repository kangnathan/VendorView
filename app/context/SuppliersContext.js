"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliersData, setSuppliersData] = useState([]); // Store the list of all suppliers
  const [error, setError] = useState(null); // Store any fetch error

  useEffect(() => {
    const fetchSuppliersData = async () => {
      try {
        const response = await fetch("/api/suppliers"); // Updated API endpoint
        const data = await response.json();

        if (response.ok) {
          setSuppliersData(data.suppliers || []); // Set the list of suppliers or default to empty
        } else {
          console.error("Failed to fetch suppliers:", data.error);
          setError(data.error || "Unknown error occurred"); // Capture error message
          setSuppliersData([]);
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        setError("Failed to fetch supplier data");
        setSuppliersData([]);
      }
    };

    fetchSuppliersData();
  }, []);

  // Function to get supplier by id
  const getSupplierById = (supplierId) => {
    return suppliersData.find((supplier) => supplier.id === supplierId);
  };

  // Function to get products of a specific supplier by their id
  const getProductsBySupplierId = (supplierId) => {
    const supplier = getSupplierById(supplierId);
    return supplier ? supplier.products : []; // Return the products array or empty array if no supplier found
  };

  // Function to create a new supplier
  const createSupplier = async (data) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Add the new supplier to the suppliers list
        setSuppliersData((prevData) => [...prevData, result.supplier]);
        return result.supplier; // Return the newly created supplier
      } else {
        console.error("Error creating supplier:", result.error);
        setError(result.error || "Unknown error occurred");
        return null;
      }
    } catch (error) {
      console.error("Error handling create supplier request:", error);
      setError("Error handling create supplier request");
      return null;
    }
  };

  // Function to update an existing supplier
  const updateSupplier = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "update", ...updatedData }),
      });

      const result = await response.json();

      if (response.ok) {
        // Update the supplier in the local state
        setSuppliersData((prevData) =>
          prevData.map((supplier) =>
            supplier.id === id ? { ...supplier, ...updatedData } : supplier
          )
        );
        return result.supplier; // Return the updated supplier
      } else {
        console.error("Error updating supplier:", result.error);
        setError(result.error || "Unknown error occurred");
        return null;
      }
    } catch (error) {
      console.error("Error handling update supplier request:", error);
      setError("Error handling update supplier request");
      return null;
    }
  };

  // Function to delete (mark as deleted) a supplier
  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "delete" }), // Specify delete action
      });

      const result = await response.json();

      if (response.ok) {
        // Update the supplier list to reflect the deletion
        setSuppliersData((prevData) =>
          prevData.map((supplier) =>
            supplier.id === id ? { ...supplier, isDeleted: true } : supplier
          )
        );
        return result.supplier; // Return the supplier with updated 'isDeleted' status
      } else {
        console.error("Error deleting supplier:", result.error);
        setError(result.error || "Unknown error occurred");
        return null;
      }
    } catch (error) {
      console.error("Error handling delete supplier request:", error);
      setError("Error handling delete supplier request");
      return null;
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliersData,
        error,
        setSuppliersData,
        getSupplierById,
        getProductsBySupplierId,
        selectedSupplier,
        setSelectedSupplier,
        createSupplier, // Expose createSupplier
        updateSupplier, // Expose updateSupplier
        deleteSupplier, // Expose deleteSupplier (mark as deleted)
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);

  // If context is undefined (in case it's not wrapped properly), throw an error
  if (!context) {
    throw new Error("useSupplierContext must be used within a SupplierProvider");
  }

  return context;
};
