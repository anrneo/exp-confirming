import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Container } from '@mui/material';
import { StoreSideComponent } from './components/StoreSideComponent';
import { ProductsComponent } from './components/ProductsComponent';




function App() {
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="xl">
      <br />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <StoreSideComponent />
        </Grid>
        <Grid item xs={9}>
          <ProductsComponent />
        </Grid>
      </Grid>
    </Box>
    </Container>
  </React.Fragment>
  )
}

export default App
