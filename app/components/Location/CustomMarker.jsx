import React, { useState, useCallback } from 'react';
import { Marker } from 'react-map-gl';
import StoreIcon from '@mui/icons-material/Store';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { tooltipStyles, markerStyles } from '@/app/styles/CustomMarkerStyles';

const CustomMarker = ({
  latitude,
  longitude,
  name,
  children,
  supplierId,
  onHover,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover?.();
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(
    (event) => {
      event.originalEvent.stopPropagation();
      onClick?.(supplierId);
    },
    [onClick, supplierId]
  );

  return (
    <Marker latitude={latitude} longitude={longitude} onClick={handleClick}>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={markerStyles}
        aria-label={`Marker for ${name}`}
      >
        {children}
      </Box>
      {isHovered && (
        <Fade in={isHovered} timeout={300}>
          <Paper elevation={6} sx={tooltipStyles}>
            <StoreIcon sx={{ marginRight: '5px' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
              {name}
            </Typography>
          </Paper>
        </Fade>
      )}
    </Marker>
  );
};

export default CustomMarker;
