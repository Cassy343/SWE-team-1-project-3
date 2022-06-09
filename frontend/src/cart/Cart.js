import Product from './Product';
import Receipt from './Receipt'
import {Stack, Box, Typography} from '@mui/material'
import './Cart.css';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SessionContext } from '../Context'


const Cart = (props) => {
    
    const session = useContext(SessionContext);

    const [productsInCart, setProductsInCart] = useState([session.cart]);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    
    useEffect(() => {

        setProductsInCart(Object.values(session.cart));
        if (Object.keys(productsInCart[0]).length !== 0){
            setIsCartEmpty(false);
        }
    }, [session.cart])

    return (<>
        {!isCartEmpty ?
            <div className = "cart">
                <div className = "products">
                    <Stack spacing = {2}>
                        {productsInCart.map((product) => {
                            return(
                                <Product
                                    product = {product}
                                    addToCart={props.addToCart}
                                    removeOneFromCart={props.removeOneFromCart}
                                />
                            )
                        })}
                    </Stack>
                </div>
                <div className = "receipt">
                    <Receipt products = {productsInCart}/>
                </div>
            </div>
            :
            <div className="empty-cart">
                <Box sx={{width: '100%', maxwidth: 500}}>
                    <Typography variant="h1" align="center" gutterBottom>
                        The Cart is empty
                    </Typography>
                    <Typography variant="h3" align="center">
                        Try adding an item from the "View Products" page!
                    </Typography>
                </Box>
            </div>}
    </>);

};

export default Cart;