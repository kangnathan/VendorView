const styles = {
  modalBackdropProps: {
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "#F1EDE3",
    p: 4,
    borderRadius: "20px",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontFamily: "poppins",
  },
  buttonContainer: {
    mt: 2,
    display: "flex",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    mr: 2,
    fontWeight: "bold",
    fontFamily: "poppins",
    borderRadius: 1,
    p: "8px 25px",
    color: "black",
    borderColor: "black",
    "&:hover": {
      borderColor: "black",
      color: "black",
    },
  },
  confirmButton: {
    backgroundColor: "#A5463A",
    color: "white",
    borderRadius: 1,
    p: "8px 45px",
    fontWeight: 600,
    fontFamily: "poppins",
  },
};

export default styles;
