export const handleRequest = async (url, method, body, successMessage, updateState, showSnackbar) => {
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (response.ok) {
      updateState(result);
      showSnackbar(successMessage, "success");
      return result.product;
    } else {
      showSnackbar(result.error || "Unknown error occurred", "error");
    }
  } catch {
    showSnackbar("An unexpected error occurred", "error");
  }
  return null;
};

export const fetchProductsData = async (setProductsData, showSnackbar) => {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    if (response.ok) {
      setProductsData(data.products || []);
    } else {
      showSnackbar(data.error || "Unknown error occurred", "error");
    }
  } catch {
    showSnackbar("Failed to fetch product data", "error");
  }
};
