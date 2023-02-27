import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import CustomTextfield from './CustomTextField';
import { getStore } from '../../services/StoreService';
import { useAppDispatch } from '../../redux/hooks'
import { setProducts, setStore } from "../../redux/appSlice";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { createProduct, editProduct } from '../../services/ProductService';


export default function FormProductDialog(props:any) {

  
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allProducts = () => {
    getStore(props.id).then((res:any)=>{
      dispatch(setProducts(res.data))
      dispatch(setStore(res.data))
    })
  };

const handleSubmit = async (values: { name: string, description: string,
price: number, storeId: number}) => {
  
  if (props.type == 'updated') {
    await editProduct(props.idProd, values)
    
  }else{
    await createProduct(values)
  }
      
    allProducts()
    setOpen(false);
  };

  return (
    <div>
      {props.type == 'created' ?
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Producto
      </Button> : 
      <ModeEditIcon color="primary" onClick={handleClickOpen}/>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.type == 'created' ? "Crear" : "Actualizar"} Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor Ingrese los siguientes datos:
          </DialogContentText>
          <br />
          
          <Formik
            initialValues={{
              name: props.product ? props.product.name : '',
              description: props.product ? props.product.description : '',
              price: props.product ? props.product.price : 0,
              storeId: props.id
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ mb: 4 }}>
                    <CustomTextfield
                      id="name"
                      label="Nombre"
                      required={true}
                      {...formik.getFieldProps('name')}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <CustomTextfield
                      id="description"
                      label="Descripción"
                      required={true}
                      {...formik.getFieldProps('description')}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <CustomTextfield
                      id="price"
                      label="Precio"
                      required={true}
                      type="number"
                      {...formik.getFieldProps('price')}
                    />
                  </Box>
                  <Button
                    sx={{ height: '60px', fontWeight: 'bold', mb: 2, width: '100%' }}
                    type="submit"
                    variant="contained"
                  >
                    {props.type == 'created' ? "Crear" : "Actualizar"}
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