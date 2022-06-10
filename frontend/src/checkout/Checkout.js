import React, {useState, useEffect, useContext} from 'react';
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

import Layout from "./Layout";
import Row from "./Row";
import CheckoutForm from "./CheckoutForm";

import {Link} from "react-router-dom";
import axios from "axios";
import { SessionContext } from '../Context'
import { getFormHelperTextUtilityClasses } from '@mui/material';

const Checkout = () => {
    const location = useLocation();
    const sentPrice = location.state?.price;
    const price = sentPrice.toFixed(2);
    console.log(price)
    const [redirect, setRedirect] = useState(null)

    return( <Layout>
        <CheckoutForm
            price={price}
            onSuccessfulCheckout={setRedirect}
        />
        {redirect && <Navigate to={redirect} state={{price: price}}/>}
    </Layout>
    )
    
}

export default Checkout;