import React from 'react'
import {Card, CardContent,  CardActionArea, CardMedia, Typography} from '@mui/material'
import {useContext, useState, useLocation} from 'react'
import { SessionContext } from "../Context";
import {Box, IconButton, Modal, Button} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";

function Product(props) {

  const session = useContext(SessionContext);
  const [removingFromCart, setRemovingFromCart] = useState(false);
  const product = props.product

  console.log("temp product", product);


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '0.3em',
    p: 4
  };

  return (<> 
    {session.cart[product.id] && 
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to="/item" state={{ id: product.id }}>
        <CardMedia
          component="img"
          height="240"
          width="100%"
          image= {product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            $ {product.price} from {product.sellerName}
          </Typography>
          <Box height='rem' />
                <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                >
                    <IconButton
                        size='small'
                        onClick={() => {
                            if (session.cart[product.id].qty === 1) {
                                setRemovingFromCart(true);
                            } else {
                                props.removeOneFromCart(product.id);
                            }
                        }}
                    >
                <RemoveIcon />
            </IconButton>
            <Typography>{session.cart[product.id].qty} in cart</Typography>
            <IconButton
                size='small'
                onClick={() => props.addToCart(product.id, product)}
            >
                <AddIcon />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    }
    <Modal
            open={removingFromCart}
            onClose={() => setRemovingFromCart(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography
                    variant='h4'
                >Are you sure you want to remove this item from your cart?</Typography>
                <Box height='1rem' />
                <Typography
                    color='text.secondary'
                    sx={{ fontSize: '1.5em' }}
                >Click outside the box to cancel.</Typography>
                <Box height='1rem' />
                <Button
                    color='error'
                    onClick={() => {
                        setRemovingFromCart(false);
                        props.removeOneFromCart(product.id);
                    }}
                    variant='contained'
                >Confirm</Button>
            </Box>
        </Modal>
    </>);
  
}

export default Product