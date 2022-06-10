
import styled from "@emotion/styled";
import GlobalStyles from "./GlobalStyles";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

console.log(process.env.REACT_APP_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />

        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <Elements stripe={stripePromise}>{children}</Elements>
    </>
  );
};

export default Layout;