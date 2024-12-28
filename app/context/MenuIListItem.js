'use client'
import React, { useContext } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SidebarContext } from './SidebarContext';
import SidebarStyles from '../styles/SidebarStyles';

const MenuListItem = ({ text, icon, path }) => {
  const { activePath, handleItemClick } = useContext(SidebarContext);
  const isActive = activePath === path;

  return (
    <ListItem sx={{ padding: '2px 20px' }}>
      <ListItemButton
        onClick={() => handleItemClick(path)}
        sx={SidebarStyles.listItemButton(isActive)}
      >
        <ListItemIcon sx={SidebarStyles.listItemIcon(isActive)}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={SidebarStyles.listItemText(isActive)} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuListItem;
