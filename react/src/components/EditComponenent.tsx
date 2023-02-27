import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, AccordionSummary, AccordionDetails, Accordion } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { getProduct } from '../services/ProductService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormStoreUpdateDialog from './Forms/FormStoreUpdateDialog';


function EditComponenent() {
    const { productId } = useParams()
    const [product, setProduct] = useState<any>()
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
  
      
    useEffect(()=>{
        if (productId) {
            getProduct(Number(productId)).then((resp:any)=>{
                setProduct(resp.data)
            })
        }
    },[productId])    

  return (
        <>
        <br />
          <Container maxWidth="sm">
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Nombre
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                   {product && product.name}
                </Typography>
                </AccordionDetails>
        </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Descripción</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {product && product.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Precio
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {product && product.price}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Tienda
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {product && product.store.name}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <NavLink to={`/`}>Home</NavLink>
        </Grid>
        <Grid item xs={6}>
        <FormStoreUpdateDialog product={product}/>
          
        </Grid>
      </Grid>
          </Container>
        </>
      );

  }

export default EditComponenent