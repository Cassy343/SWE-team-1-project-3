import { Grid, Typography, Card, CardMedia, CardActionArea, CardContent } from '@mui/material'
import { useState, useEffect } from "react"

const Products = (props) => {
    const [products, setProducts] = useState([]);

    // GET products
    useEffect(() => {
        fetch("http://localhost:8000/products/all")
        .then((res) => res.json())
        .then((text) => {
            text.result.sort((a,b) => {
                return b.data.date_posted.seconds-a.data.date_posted.seconds
            })
            setProducts(text.result);
        })
        .catch((err) => console.log(err))

        fetch("http://localhost:8000/products/info?id=" + "HNKZ8RiItI5l0wLYgfe8")
        .then((res) => res.json())
        .then((text) => console.log(text.id, text.data, text.sellerName))
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
            <CardMedia
                component="img"
                height="70%"
                width="100%"
                image={data.image}
                alt={data.name} 
            />
        <CardActionArea>
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