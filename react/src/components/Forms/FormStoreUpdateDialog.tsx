import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getStores } from '../../services/StoreService';
import { useEffect, useState } from 'react';
import { editProduct } from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';


export default function FormStoreUpdateDialog(props:any) {
  const navigate = useNavigate();
  const [stores, setStores] = useState([])
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    getStores().then((res:any)=>{
      setStores(res.data)
    })
},[])   

const handleSubmit = async (values: { id: string}) => {
  let {product} = props
  product.storeId = values.id
  await editProduct(product.id, product)
  setOpen(false);
  navigate("/");
  };

  return (
    <div>
      
      <Button variant="outlined" onClick={handleClickOpen}>
        Actualizar Tienda
      </Button> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Actualizar Tienda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione la tienda:
          </DialogContentText>
          <br />
          
          <Formik
            initialValues={{
              id: ''
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="nameStore">Tienda</InputLabel>
                    <Select
                      labelId="nameStore"
                      id="nameStore"
                      label="tienda"
                     
                      required={true}
                      {...formik.getFieldProps('id')}
                    >
                      
                      {stores?.map((store:any)=>{
                         return (
                        <MenuItem value={store.id} key={store.id}>{store.name}</MenuItem>
                         )
                      })}
                      
                      
                    </Select>
                  </FormControl>
                  </Box>
                 
                  <Button
                    sx={{ height: '60px', fontWeight: 'bold', mb: 2, width: '100%' }}
                    type="submit"
                    variant="contained"
                  >
                    Actualizar
                  </Button>
                </form>
              </>
            )}
          </Formik>
          
        </DialogContent>
        
      </Dialog>
    </div>
  );
}