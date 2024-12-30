export const customDataGridStyles = {
  container: {
    height: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '8px',
    fontFamily: 'Poppins, sans-serif',
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '100%',
    '& .MuiLinearProgress-bar': { backgroundColor: '#A5463A' },
    backgroundColor: '#F1EDE3',
  },
  dataGrid: {
    flexGrow: 1,
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#F1EDE3',
      color: '#A5463A',
      fontWeight: 'bold',
      fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiDataGrid-row': {
      '&:hover': {
        backgroundColor: 'inherit', // Removes hover animation
      },
      fontFamily: 'Poppins, sans-serif',
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none', // Disables focus outline on cells
    },
    borderRadius: '8px',
    border: 'none',
  },
};
