import Product from './Product';
import Receipt from './Receipt'
import {Stack, Box, Typography} from '@mui/material'
import './Cart.css';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SessionContext } from '../Context'
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Helmet from 'react-helmet';

const Cart = (props) => {
    
    const session = useContext(SessionContext);

    const [productsInCart, setProductsInCart] = useState([session.cart]);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [price, setPrice] = useState(0)
    
    useEffect(() => {

        setProductsInCart(Object.values(session.cart));
        if (Object.keys(productsInCart[0]).length !== 0){
            setIsCartEmpty(false);
        }
    }, [session.cart])

    return (<>
        <Helmet><title>Ushop | Cart</title></Helmet>
        {!isCartEmpty ?
            <div className="cart">
                <div className="products">
                    <Stack spacing = {2}>
                        {productsInCart.map((product) => {
                            return(
                                <Product
                                    key={product.id}
                                    product = {product}
                                    addToCart={props.addToCart}
                                    removeOneFromCart={props.removeOneFromCart}
                                />
                            )
                        })}
                    </Stack>
                </div>
                <div className = "receipt">
                    <Receipt products = {productsInCart} setPrice = {setPrice}/>
                    <br></br>
                    <div align='right'>
                        <Button variant='contained' component={Link} to="/checkout" state={{ price: price }}>Proceed to Checkout</Button></div>
                </div>
            </div>
            :
            <div className="empty-cart">
                <Receipt products={[]} setPrice = {setPrice}/>
                <Box sx={{width: '100%', maxwidth: 500, mt: 2}}>
                    <Typography variant="h5" align="center" gutterBottom>
                        The Cart is empty
                    </Typography>
                    <Typography variant="h6" align="center">
                        Try adding an item from the "View Products" page!
                    </Typography>
                </Box>
                
            </div>}
    </>);

};

export default Cart;