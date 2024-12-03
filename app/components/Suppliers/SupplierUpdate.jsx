import { Box, Button } from "@mui/material";
import { useSupplierContext } from "@/app/context/SuppliersContext";

export default function SupplierUpdate({ supplier }) {
  const { updateSupplier } = useSupplierContext();

  const handleUpdate = async () => {
    if (!supplier || Object.keys(supplier).length === 0) {
      alert("No supplier data to update");
      return;
    }

    try {
      const updated = await updateSupplier(supplier); // Call context method to save changes
      if (updated) {
        alert("Supplier updated successfully!");
      } else {
        alert("Failed to update supplier.");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("An error occurred while updating the supplier.");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleUpdate}
        sx={{
          marginTop: "5px",
          padding: "10px 25px",
          borderRadius: "10px",
          backgroundColor: "#A35422",
          fontFamily: "poppins",
          fontWeight: 500,
          marginRight: "20px",
        }}
      >
        UPDATE
      </Button>
    </Box>
  );
}
