import { Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selecProducts, selectNameStore, setProducts, setStore } from "../redux/appSlice";
import { styled } from '@mui/material/styles';
import FormProductDialog from "./Forms/FormProductDialog";
import { deleteProduct } from "../services/ProductService";
import { getStore } from "../services/StoreService";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  
}));


export const ProductsComponent = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selecProducts);
  const storeName = useAppSelector(selectNameStore);

  useEffect(() => {
    dispatch(setStore({data:true}))
  },[products])

  const handleClickDelete = async(id:number) => {
    await deleteProduct(id)
    getAllProducts()
};

const  getAllProducts = () => {
  getStore(products?.id).then((res:any)=>{
   dispatch(setProducts(res.data))
  })
} 

  return (<>
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Button variant="contained"> Productos {storeName}</Button>
        </Grid>
        <Grid item xs={6}>
          <FormProductDialog type="created" id={products?.id}/>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.products?.map((row:any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Link to={`edit/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.image}</TableCell>
              <TableCell>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  
                  <FormProductDialog type="updated" id={products?.id} idProd={row.id} product={row}/>
                  
                </Grid>
                <Grid item xs={6}>
                  
                  <DeleteIcon color="warning" onClick={() => handleClickDelete(row.id)}/>
                  
                </Grid>
                
              </Grid>
              
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )

}