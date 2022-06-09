import Product from './Product';
import Receipt from './Receipt'
import {Stack, Box, Typography} from '@mui/material'
import './Cart.css';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SessionContext } from '../Context'
import Helmet from 'react-helmet';


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
                <div className="receipt">
                    <Receipt products={productsInCart} />
                </div>
            </div>
            :
            <div className="empty-cart">
                <Receipt products={[]} />
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