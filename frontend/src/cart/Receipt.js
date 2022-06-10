import React from 'react';
import {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Receipt(props) {
  
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const products = props.products;
  const TAX_RATE = 0.06;
  
  useEffect(() => {
    getSubtotal(products);
    setTotalTaxes(TAX_RATE * subtotalPrice);
    setTotalPrice(totalTaxes + subtotalPrice);
    props.setPrice(totalPrice)
  }, [subtotalPrice, products, totalPrice, totalTaxes])

  const ccyFormat = (num) => `$ ${num.toFixed(2)}`

  const getSubtotal = (products) => {
    setSubtotalPrice(0);
    products.forEach(product => {
      setSubtotalPrice((prev) => (prev + (product.price * product.qty)));
     });
     
  }
 
  return(

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Receipt Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.qty}</TableCell>
              <TableCell align="right">{ccyFormat(product.price)}</TableCell>
              <TableCell align="right">{ccyFormat(product.price * product.qty)}</TableCell>
            </TableRow>
          ))}
          <TableRow height = {25}/>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subtotalPrice)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(totalTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Receipt