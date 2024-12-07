'use client'
import React, { useContext } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { SidebarContext } from '../context/SidebarContext'
import SidebarStyles from '../styles/SidebarStyles'

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

export default function Sidebar({ children }) {
    const {
        open,
        toggleDrawer,
        menuItems,
        accountItems,
    } = useContext(SidebarContext);

    return (
        <Box sx={SidebarStyles.gridContainer(open)}>
            <Drawer sx={SidebarStyles.drawer(open)} variant="persistent" open={open}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    <Typography variant="h6" noWrap sx={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800 }}>
                        Vendor <span style={{ color: '#A35422' }}>View</span>
                    </Typography>
                </Box>

                <Typography sx={{ fontFamily: 'poppins', paddingLeft: '20px', fontWeight: 400, fontSize: '17px' }}>
                    MENU
                </Typography>

                <List sx={{ marginBottom: '20px' }}>
                    {menuItems.map(({ text, icon, path }) => (
                        <MenuListItem key={text} text={text} icon={icon} path={path} />
                    ))}
                </List>

                <Typography sx={{ fontFamily: 'poppins', paddingLeft: '20px', fontWeight: 400, fontSize: '17px' }}>
                    USER
                </Typography>

                <List sx={{ marginBottom: '20px' }}>
                    {accountItems.map(({ text, icon, path }) => (
                        <MenuListItem key={text} text={text} icon={icon} path={path} />
                    ))}
                </List>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right',
                        marginTop: '250px',
                        paddingRight: '30px',
                    }}
                >
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            color: '#F7F7F5',
                            '&:hover': { backgroundColor: '#424345', color: '#FFFFFF' },
                        }}
                    >
                        <ArrowBackRoundedIcon fontSize="large" />
                    </IconButton>
                </Box>


            </Drawer>

            {!open && (
                <IconButton onClick={toggleDrawer} sx={SidebarStyles.menuIcon}>
                    <MenuIcon sx={{ color: '#3A3836' }} />
                </IconButton>
            )}

            <Box
                component="main"
            >
                {children}
            </Box>
        </Box>
    );
}
