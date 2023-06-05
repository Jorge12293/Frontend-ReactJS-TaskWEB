import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar';

const drawerWidth = 240;

export const TaskLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}}>
        
        <SideBar drawerWidth={drawerWidth}/>
        
        <NavBar drawerWidth={drawerWidth}/>
    
        <Box component='main'
            sx={{ flexGrow:1, p:3 }}>
            <Toolbar />      
            {children}
        </Box>
    </Box>
  )
}
