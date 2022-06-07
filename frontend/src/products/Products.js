import { Grid, Typography, Card, CardMedia, CardActionArea, CardContent } from '@mui/material'
import { useState, useEffect } from "react"
import {Link} from "react-router-dom";

const Products = (props) => {
    const [products, setProducts] = useState([]);

    // GET products
    useEffect(() => {
        fetch("products/all")
        .then((res) => res.json())
        .then((text) => {
            text.result.sort((a,b) => {
                return b.data.date_posted.seconds-a.data.date_posted.seconds
            })
            setProducts(text.result);
        })
        .catch((err) => console.log(err))
    }, [])

    return (<>
        <Grid sx={{marginLeft: '5%', marginTop: '2%'}} container rowSpacing={3}>
            {products.map(product => <Grid item xs={3}><ProductCard product={product}/></Grid>)}
        </Grid>
    </>);
};

const ProductCard = (props) => {
    const data = props.product.data;
    const id = props.product.id;
    const sellerName = props.product.sellerName;

    return (
    <>
        <Card variant="outlined" sx={{width: 300, height: 350}}>
        <CardActionArea component={Link} to="/item" state={{ id: id }}>
            <CardMedia
                component="img"
                height="240"
                width="100%"
                image={data.image}
                alt={data.name} 
            />
        
            <CardContent >
                <Typography sx={{fontWeight: 'bold'}} variant="h6">{data.name}</Typography>
                <Typography>Seller: {sellerName}</Typography>
                <Typography>Date Posted: {new Date(data.date_posted.seconds*1000).toDateString()}</Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
    )
}

export default Products;