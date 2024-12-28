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
      return result.supplier;
    } else {
      showSnackbar(result.error || "Unknown error occurred", "error");
    }
  } catch {
    showSnackbar("An unexpected error occurred", "error");
  }
  return null;
};

export const fetchSuppliersData = async (setSuppliersData, showSnackbar) => {
  try {
    const response = await fetch("/api/suppliers");
    const data = await response.json();
    if (response.ok) {
      setSuppliersData(data.suppliers || []);
    } else {
      showSnackbar(data.error || "Unknown error occurred", "error");
    }
  } catch {
    showSnackbar("Failed to fetch supplier data", "error");
  }
};
