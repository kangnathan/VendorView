"use client"
import { useContext, useState, createContext,  } from "react"
import { useRouter } from "next/navigation";

const SnackbarContext = createContext()

export const SnackbarProvider = ({ children }) => {
    
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    
    const toggleSnackbar = (state) => setSnackbar((prev) => ({ ...prev, open: state }));
    const showSnackbar = (message, severity = "info") => setSnackbar({ open: true, message, severity });

    return (
        <SnackbarContext.Provider
            value={{
            snackbar,
            toggleSnackbar,
            showSnackbar,
        }}
        >
            {children}    
        </SnackbarContext.Provider>
    );
}

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbarContext must be used within a SupplierProvider");
  }
  return context;
};




  
