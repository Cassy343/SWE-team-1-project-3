import React from 'react'
import {Card, CardContent,  CardActionArea, CardMedia, Typography} from '@mui/material'

function Product(props) {
    const price = props.price;
    const name = props.name;
    const img = props.img;
    const seller = props.seller;

  return (<>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Product name
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            This is the product description of where you can list 
            so many cool things about the product. 
          </Typography> */}
          <Typography variant="body1" color="text.secondary">
            (price) from (seller)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>);
}

export default Product