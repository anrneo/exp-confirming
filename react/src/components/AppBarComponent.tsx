import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';





function AppBarComponent() {
  return (
      <React.Fragment>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EXP confirming
          </Typography>
          <Link href='/' color="inherit">Home</Link>
        </Toolbar>
      </AppBar>
    </Box>
    </React.Fragment>
  )
}

export default AppBarComponent
