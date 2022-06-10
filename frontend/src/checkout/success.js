import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import { useLocation } from "react-router";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import Typography from '@mui/material/Typography';
import { SessionContext } from '../Context'
import { useEffect, useState, useContext, useReducer } from 'react';

const Container = styled.div`
  width: 475px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: #000;
`;

export default (props) => {
  const session = useContext(SessionContext);
  const location = useLocation();
  const price = location.state?.price;

  useEffect(() => {
  }, [])

  return (
    <Layout title="Success!">
      <Container>
      <br></br><br></br>
        <Typography variant='h5'>Your payment of ${price} has been processed.</Typography>
        <br></br><br></br>
        <Button size='large' component={Link} to="/products">Return to Product List</Button>
      </Container>
    </Layout>
  );
};