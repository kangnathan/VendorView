'use client'
import React, { useContext, useState, useEffect } from 'react'
import { Drawer, List, Typography, IconButton, Box, CircularProgress } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { SidebarContext } from '../context/SidebarContext'
import SidebarStyles from '../styles/SidebarStyles'
import MenuListItem from '@/app/context/MenuIListItem'

export default function Sidebar({ children }) {
  const { open, toggleDrawer, menuItems, accountItems } = useContext(SidebarContext)
  
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false) 
    }, 2000)  
  }, [])

  return (
    <Box sx={SidebarStyles.gridContainer(open)}>
      <Drawer sx={SidebarStyles.drawer(open)} variant="persistent" open={open}>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '15px',
            marginTop: '15px',
          }}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: '#F7F7F5',
              '&:hover': { backgroundColor: '#424345', color: '#FFFFFF' },
            }}
          >
            <MenuIcon sx={{ color: '#ffffff' }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50px 25px 50px 25px' }}>
          <Typography variant="h6" noWrap sx={{ fontSize: '24px', fontFamily: 'poppins', fontWeight: 800 }}>
            Vendor<span style={{ color: '#A35422' }}>View</span>
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: 'poppins', paddingLeft: '20px', fontWeight: 400, fontSize: '17px' }}>
          MENU
        </Typography>

        <List sx={{ marginBottom: '20px' }}>
          {menuItems.map(({ text, icon, path }) => (
            <MenuListItem key={path} text={text} icon={icon} path={path} />
          ))}
        </List>

        <Typography sx={{ fontFamily: 'poppins', paddingLeft: '20px', fontWeight: 400, fontSize: '17px' }}>
          USER
        </Typography>

        <List sx={{ marginBottom: '20px' }}>
          {accountItems.map(({ text, icon, path }) => (
            <MenuListItem key={path} text={text} icon={icon} path={path} />
          ))}
        </List>

      </Drawer>

      {!open && (
        <IconButton onClick={toggleDrawer} sx={SidebarStyles.menuIcon}>
          <MenuIcon sx={{ color: '#3A3836' }} />
        </IconButton>
      )}

      <Box component="main" sx={{ position: 'relative' }}>
        {loading ? (
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }}>
            <CircularProgress size={40} sx={{ color: '#A35422' }}/>
          </Box>
        ) : (
          children
        )}
      </Box>
    </Box>
  )
}
