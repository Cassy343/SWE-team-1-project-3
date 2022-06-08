import React from 'react'
import {Card, CardContent,  CardActionArea, CardMedia, Typography} from '@mui/material'

function Product(props) {

  return (<>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {props.image}
          alt="product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {props.price} from {props.sellerName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Quantity: {props.qty}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>);
}

export default Product