import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material'
import {useState, useEffect} from 'react'

function Receipt(props) {
  const name = "sample product"
  const qty = 1;
  const price = 4.99;
  const [totalPrice, setTotalPrice] = useState(0);
  const products = props.products;


  useEffect(() => {
    setTotalPrice(0);
    [price, price, price].map((product) => {
      setTotalPrice((prev) => ( prev + product))
    } )
  }, [])

  return (
    
    <List sx={{ width: '400%', maxWidth: 360, bgcolor: 'background.paper', border: 5, borderColor: 'blue'}}>
    <ListItem>
      <ListItemText primary={'Receipt'} />
    </ListItem>
      {[1, 2, 3].map((product) => { return (
        <>
        <ListItem> 
          <ListItemText primary={name} />
          <ListItemText primary={qty} />
          <ListItemText primary = {price} />
        </ListItem>
        <Divider />
        </>
      )})}
      <ListItem >
        <ListItemText primary={'Total Price'} />
        <ListItemText primary= {`$ ${totalPrice}`} />
      </ListItem>
  </List>
  
    )
}

export default Receipt