import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteStore, getStores } from "../services/StoreService"
import { StoreResponse } from "../types"
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setProducts, setNameStore, selecCreatedStore } from "../redux/appSlice";
import FormStoreDialog from "./Forms/FormStoreDialog";

export const StoreSideComponent = () => {
  const dispatch = useAppDispatch()
  const [stores, setStores] = useState<StoreResponse[]>()
  const createdStore = useAppSelector(selecCreatedStore);

  useEffect(() => {
    getAllStores(true)
  }, [])

  useEffect(() => {
    getAllStores()
    if (createdStore && createdStore.name) {
      dispatch(setNameStore(createdStore.name))
    }
  },[createdStore])

  const  getAllStores = (is=false) => {
    getStores().then((res:any)=>{
      setStores(res.data)
      if (is && res.data.length) {
        dispatch(setProducts(res.data[0]))
        dispatch(setNameStore(res.data[0].name))
      }
    })
  } 

  const handleClick = (products:any) => {
    dispatch(setProducts(products))
    dispatch(setNameStore(products.name))
  };

  const handleClickDelete = (id:number) => {
      deleteStore(id).then((res:any)=>{
        getAllStores()
      })
  };

  return (
    <>
      <List>
            {stores?.map(store=>(
              <ListItem disablePadding key={store.id} >
              <ListItemButton id={store.name+store.id} onClick={() => handleClick(store)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary={store.name} />
              </ListItemButton>
              

              <FormStoreDialog type="update" store={store}/>
                <DeleteIcon color="warning" onClick={() => handleClickDelete(store.id)}/>
              
            </ListItem>
            ))}
        </List>
         <Divider />
         <br />
         <FormStoreDialog type="created"/>
    </>
  )

}