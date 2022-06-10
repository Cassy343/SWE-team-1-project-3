import React, {useState, useEffect, useContext} from 'react';
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import CheckoutForm from "./CheckoutForm";

const Checkout = (props) => {
    const location = useLocation();
    const sentPrice = location.state?.price;
    const price = sentPrice.toFixed(2);
    const [redirect, setRedirect] = useState(null)

    return(<Layout>
        <br></br><br></br><br></br>
        <CheckoutForm
            price={price}
            onSuccessfulCheckout={setRedirect}
            clearCart={props.clearCart}
        />
        {redirect && <Navigate to={redirect} state={{price: price}}/>}
    </Layout>
    )
}

export default Checkout;