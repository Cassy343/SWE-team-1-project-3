import { Grid, Typography, Card, CardMedia, CardActionArea, CardContent, TextField, Button } from '@mui/material'
import { useState, useEffect, useRef } from "react"
import {Link} from "react-router-dom";

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [input, setInput] = useState("");

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

    return (
    <div style={{ marginLeft: '70px', marginRight: '70px', marginBottom: '70px'}}>
        <h1 style={{textAlign: 'center', }}>All Products</h1>
        <SearchBar setInput={setInput}/>
        <Grid sx={{ marginTop: '1%'}} container spacing={3}>
            {products.map(product => {
                if(product.data.name.toLowerCase().includes(input))
                    return <Grid item xs={3}><ProductCard product={product}/></Grid>
                else
                    return null;
            })}
        </Grid>
    </div>
    );
};

const SearchBar = (props) => {
    const {setInput} = props;
    const searchRef = useRef();

    // const submit = (e) => {
    //     e.preventDefault();
    //     let lowercase = searchRef.current.value.toLowerCase();
    //     setInput(lowercase);
    // }
    
    const handleChange = (e) => {
        let lowercase = e.target.value.toLowerCase();
        setInput(lowercase);
    }

    const clear = (e) => {
        e.preventDefault();
        setInput("");
        document.getElementById("search").value = "";
    }

    return(
    <>
        <TextField onChange={handleChange} variant="outlined" label="Search for an item..." size="small" sx={{width: '35%'}} inputRef={searchRef} id="search"/>
        {/* <Button variant="contained" sx={{marginLeft: 1}} onClick={submit}>Search</Button> */}
        <Button variant="outlined" sx={{marginLeft: 1}} onClick={clear}>Clear</Button>
    </>
    )
}

const ProductCard = (props) => {
    const data = props.product.data;
    const id = props.product.id;
    const sellerName = props.product.sellerName;

    return (
    <>
        <Card variant="outlined" sx={{maxWidth: 300, maxHeight: 350}}>
        <CardActionArea component={Link} to="/item" state={{ id: id }}>
            <CardMedia
                component="img"
                height="240"
                width="100%"
                image={data.image}
                alt={data.name}
                title={data.name} 
            />
        
            <CardContent sx={{backgroundColor: '#f5f5f5'}}>
                <Typography noWrap sx={{fontWeight: 'bold'}} variant="h6">{data.name}</Typography>
                <Typography>${data.price}</Typography>
                <Typography noWrap sx={{fontSize: 14}} color="text.secondary">By {sellerName} on {new Date(data.date_posted.seconds*1000).toDateString()}</Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
    )
}

export default Products;