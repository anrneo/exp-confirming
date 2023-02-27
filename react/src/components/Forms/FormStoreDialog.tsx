import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import CustomTextfield from './CustomTextField';
import { createStore, editStore } from '../../services/StoreService';
import { useAppDispatch } from '../../redux/hooks'
import { setStore } from "../../redux/appSlice";
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function FormStoreDialog(props:any) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


const handleSubmit = async (values: { name: string}) => {
  let resp:any = {}
  if (props.store) {
    resp =  await editStore(props.store.id, values)
  }else{
    resp = await createStore(values)
  }
      dispatch(setStore(resp.data))
      setOpen(false);
  };

  return (
    <div>
      {props.type == 'created' ?
      <Button variant="outlined" onClick={handleClickOpen}>
        Crear Tienda
      </Button> : 
      <ModeEditIcon color="primary" onClick={handleClickOpen}/>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.type == 'created' ? "Crear" : "Actualizar"} Tienda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los siguientes datos:
          </DialogContentText>
          <br />
          
          <Formik
            initialValues={{
              name: props.store ? props.store.name : ''
            }}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <CustomTextfield
                      id="name"
                      label="Nombre de la tienda"
                      required={true}
                      {...formik.getFieldProps('name')}
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