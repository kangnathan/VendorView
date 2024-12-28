"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { handleRequest, fetchProductsData } from "../utils/productApiUtils";
import { toggleDeleteModal, selectProduct } from "../utils/productModalUtils";
import validateProductInputs from "../utils/productValidateInputs";
import { useSnackbarContext } from "./SnackbarContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { showSnackbar } = useSnackbarContext();
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [modalState, setModalState] = useState({ selectedProductId: null, isDeleteModalOpen: false })
const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
      name: '',
      price: '',
      type: '',
      supplier: '',
  })


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

const applyFilters = (products, filters) => {
  return products.filter((product) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; 
      const productValue = product[key];
      if (!productValue) return false;
      return productValue.toString().toLowerCase().includes(value.toLowerCase());
    });
  });
};

  const getProductById = (productId) => productsData.find((product) => product.id === productId);

  const handleError = (message, errorType = "error") => {
    setError(message);
    showSnackbar(message, errorType);
  };

  const fetchProducts = useCallback(() => {
    fetchProductsData(setProductsData, showSnackbar);
  }, [showSnackbar]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (data) => {
    const validationError = validateProductInputs(data);
      if (validationError) {
        showSnackbar(validationError, "warning");
        return null;
      }

    return handleRequest(
      "/api/products",
      "POST",
      data,
      "Product created successfully!",
      (result) => {
        setProductsData((prev) => [...prev, result.product]);
        router.push('/products');
      },
      showSnackbar
    );
  };

  const updateProduct = async (id, updatedData) => {
    return handleRequest(
      `/api/products/${id}`,
      "PUT",
      { action: "update", ...updatedData },
      "Product updated successfully!",
      (result) => {
        setProductsData((prev) =>
          prev.map((product) => (product.id === id ? { ...product, ...updatedData } : product))
        );
      },
      showSnackbar
    );
  };

  const deleteProduct = async (id) => {
    if (!id) {
      handleError("Invalid product ID");
      return null;
    }

    return handleRequest(
      `/api/products/${id}`,
      "PUT",
      { action: "delete" },
      "Product deleted successfully!",
      () => {
        setProductsData((prev) =>
          prev.map((product) => (product.id === id ? { ...product, isDeleted: true } : product))
        );
        router.push('/products');
      },
      showSnackbar
    );
  };

  return (
    <ProductContext.Provider
      value={{
        productsData,
        error,
        search,
        setSearch,
        createProduct,
        updateProduct,
        deleteProduct,
        modalState,
        selectProduct: (id) => selectProduct(setModalState, id),
        toggleDeleteModal: (state) => toggleDeleteModal(setModalState, state),
        getProductById,
        handleClose,
        handleOpen,
        open,
        filters,
        setFilters,
        applyFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
