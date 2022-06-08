import Product from '../Components/Product';
import Receipt from './Receipt'
import {Stack} from '@mui/material'
import './Cart.css';
import { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../Context'

const Cart = () => {
    const session = useContext(SessionContext);

    const [productsInCart, setProductsInCart] = useState([session.cart]);
    const [isCartEmpty, setIsCartEmpty] = useState(true);


    useEffect(() => {

        setProductsInCart(Object.values(session.cart));
        if (Object.keys(productsInCart[0]).length !== 0){
            setIsCartEmpty(false);
        }
    }, [])

    if(isCartEmpty){
        return(
            <h1> Cart is empty!</h1>
        )
    }
    else {
        return (
            <div className = "cart">
                <div className = "products">
                    <Stack spacing = {2}>
                        {productsInCart.map((product) => {
                            return(
                                <Product
                                    name = {product.name} 
                                    qty = {product.qty}
                                    sellerName = {product.sellerName}
                                    price = {product.price}
                                    image = {product.image}
                                />
                            )
                        })}
                    </Stack>
                </div>
                <div className = "receipt">
                        <Receipt products = {productsInCart}/>
                </div>
            </div>
        );
    }
    
};

export default Cart;