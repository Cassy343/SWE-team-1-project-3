import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import { useLocation } from "react-router";
import {Link} from "react-router-dom";

import Layout from "./Layout";
import Row from "./Row";

const Container = styled.div`
  width: 475px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: #000;
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
`;

export default (props) => {
  const location = useLocation();
  const price = location.state?.price;

  return (
    <Layout title="Success!">
      <Container>
        <Title></Title>
        <Message>Your payment of ${price} has been processed.</Message>
        <br></br>
        <Button component={Link} to="/products">Return to Product List</Button>
      </Container>
    </Layout>
  );
};