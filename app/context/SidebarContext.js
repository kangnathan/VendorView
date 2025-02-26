'use client';

import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [activePath, setActivePath] = useState('/home');
  const router = useRouter();

  const toggleDrawer = () => setOpen(!open);

  const handleItemClick = (path) => {
    setActivePath(path);
    if (path === '/') {
      handleLogout();
    } else {
      router.push(path);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => setActivePath(window.location.pathname);

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const menuItems = [
    { text: 'Home', icon: <HomeRoundedIcon />, path: '/home' },
    { text: 'Suppliers', icon: <StoreRoundedIcon />, path: '/suppliers' },
    { text: 'Products', icon: <InventoryIcon sx={{ fontSize: '20px' }} />, path: '/products' },
    { text: 'Location', icon: <LocationOnRoundedIcon />, path: '/location' },
  ];

  const accountItems = [
    { text: 'Security', icon: <VpnKeyRoundedIcon />, path: '/security' },
    { text: 'Logout', icon: <ExitToAppRoundedIcon />, path: '/' },
  ];

  return (
    <SidebarContext.Provider
      value={{
        open,
        activePath,
        toggleDrawer,
        handleItemClick,
        menuItems,
        accountItems,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
