import Product from '../Components/Product';
import Receipt from './Receipt'
import {Stack} from '@mui/material'
import { useState } from 'react';
import './Cart.css';
import { useEffect } from 'react';

const Cart = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      
    }, [])
    

    return (
    <div className = "cart">
        <div className = "products">
            <Stack spacing = {2}>
                {/* {products.map((product) => {
                    return(
                    <Product />
                    )
                })} */}
                <Product />
                <Product />
                <Product />
            </Stack>
        </div>
        <div className = "receipt">
                <Receipt/>
        </div>
    </div>
    );
};

export default Cart;