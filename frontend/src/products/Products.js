import { Grid } from '@mui/material'
import { useState, useEffect, useRef, useContext } from "react"
import { SessionContext } from '../Context';

import SearchBar from './SearchBar';
import ProductCard from './ProductCard';

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [input, setInput] = useState("");
    const session = useContext(SessionContext);

    // GET products
    useEffect(() => {
        fetch("products/all", {
            headers: {
                'access-token': session.token
            }
        })
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


export default Products;