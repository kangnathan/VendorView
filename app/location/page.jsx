// pages/location-page.js
'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MapComponent from '@/app/components/Location/MapComponent'; // Import the new MapComponent
import SupplierSearch from '../components/Suppliers/SupplierSearch';
import LocationFilterModal from '@/app/components/Location/LocationFilterModal';
import CustomSubmitButton from '../components/CustomSubmitButton';
import LocationSet from '@/app/components/Location/LocationSet';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import CustomSnackbar from '../components/CustomSnackbar';
import { useSupplierContext } from '@/app/context/SuppliersContext'; 
import { useLocationContext } from '../context/LocationContext';
import { Box, Fade  } from '@mui/material';

const LocationPage = () => {
  const { handleOpen } = useSupplierContext();
  const { clickedLocation, handleOpenSet, clearClickedLocation } = useLocationContext(); 

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (clickedLocation) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [clickedLocation]);

  return (  
    <Sidebar>
      <Box
        gap={2}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '70px',
          marginTop: '20px',
          position: 'absolute',
          zIndex: 10,
        }}
      >
        <SupplierSearch />
        <CustomSubmitButton text='filter' onClick={handleOpen} />
        
        {/* Show the buttons with fade transition */}
        <Box
          display="flex"
          flexDirection="row"
        >
          <Fade in={isButtonVisible} timeout={500}>
            <div>
              <CustomSubmitButton
                startIcon={<AddLocationAltIcon />}
                text="SET LOCATION"
                onClick={handleOpenSet}
              />
            </div>
          </Fade>
          <Fade in={isButtonVisible} timeout={500}>
            <div>
              <CustomSubmitButton
                startIcon={<LocationOffIcon />}
                onClick={clearClickedLocation}
                style={{ padding: '12px 5px 12px 10px' }}
              />
            </div>
          </Fade>
        </Box>
      </Box>
      
      <LocationSet />
      <LocationFilterModal />
      <CustomSnackbar/>
      <MapComponent />
    </Sidebar>
  );
};

export default LocationPage;
