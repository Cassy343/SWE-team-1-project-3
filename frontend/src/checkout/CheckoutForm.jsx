import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";

import Row from "./Row";
import BillingDetailsFields from "./BillingDetailsFields";
import SubmitButton from "./SubmitButton";
import CheckoutError from "./CheckoutError";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
    }
  };

  setProcessingTo(true);

  const cardElement = elements.getElement("card");

  try {
    const { data: clientSecret } = await axios.post("http://localhost:8000/payment_intents/", {
      amount: (price * 100).toFixed(0)
    });

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails
    });

    if (paymentMethodReq.error) {
      setCheckoutError(paymentMethodReq.error.message);
      setProcessingTo(false);
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id
    });

    if (error) {
      setCheckoutError(error.message);
      setProcessingTo(false);
      return;
    }

    onSuccessfulCheckout("/success");
  } catch (err) {
    setCheckoutError(err.message);
  }
};

const iframeStyles = {
  base: {
    color: "#1D5929",
    fontSize: "16px",
    iconColor: "#fff",
    "::placeholder": {
      color: "#709C79"
    }
  },
  invalid: {
    iconColor: "red",
    color: "#709C79"
  },
  complete: {
    iconColor: "#1D5929"
  }
};

const cardElementOpts = {
  iconStyle: "solid",
  style: iframeStyles,
  hidePostalCode: true
};

  return (
    <div style={{  textAlign: 'center',}}>
      <Typography variant='h4'>Checkout</Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <p></p>
        </Grid>
        <Grid item xs={4}>
          <form onSubmit={handleFormSubmit}> 
            <BillingDetailsFields />
            <Row>
              <CardElementContainer>
                <CardElement
                  options={cardElementOpts}
                  onChange={handleCardDetailsChange}
                />
              </CardElementContainer>
            </Row>
            {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
            <Row>
              <SubmitButton disabled={isProcessing || !stripe}><Typography><b>
                {isProcessing ? "Processing..." : `Pay $${price}`}</b></Typography>
              </SubmitButton>
            </Row>
          </form>
        </Grid>
        <Grid item xs={4}>
          <p></p>
        </Grid>
    </Grid>
    </div>
  );
};

export default CheckoutForm;