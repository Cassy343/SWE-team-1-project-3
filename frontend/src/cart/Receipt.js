import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material'
import {useState, useEffect} from 'react'

function Receipt(props) {
  
  const [totalPrice, setTotalPrice] = useState(0);
  const products = props.products;


  useEffect(() => {
    setTotalPrice(0);
    products.forEach(product => {
      setTotalPrice((prev) => (prev + (product.price * product.qty)))
    });
  }, [])

  return (
    
    <List sx={{ width: '500%', maxWidth: 700, bgcolor: 'background.paper', border: 5, borderColor: 'blue'}}>
      <ListItem>
        <ListItemText primary={'Receipt'} />
        <ListItemText primary={'Quantity'} />
        <ListItemText primary={'Price'} />
      </ListItem>
        {products.map((product) => { return (
          <>
            <ListItem>
              <ListItemText primary={product.name} />
              <ListItemText primary={product.qty} />
              <ListItemText primary = {product.price} />
            </ListItem>
            <Divider />
          </>
        )})}
        <ListItem >
          <ListItemText primary={'Total Price'} />
          <ListItemText primary= {`$ ${totalPrice.toFixed(2)}`} />
        </ListItem>
    </List>
  )
}

export default Receipt