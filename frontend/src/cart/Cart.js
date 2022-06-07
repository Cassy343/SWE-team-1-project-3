import Product from '../Components/Product';
import Receipt from './Receipt'
import {Stack} from '@mui/material'
import './Cart.css';
import { useEffect, useState, useContext } from 'react';
import { SessionContext } from '../Context'

const Cart = () => {

    const [products, setProducts] = useState([]);

    const session = useContext(SessionContext);
    console.log("session uid", session.uid);
    const iansUID = 'PiO0LdBIBGOEpDvm2bt1H86G9Au2'
    const url = "products?user=" + iansUID;

    useEffect(() => {
      fetch(url)
      .then((res) => res.json())
      .then((text) => {
          const newProducts = text.result.map(p => {
              return {
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  description: p.description,
                  image: p.image,
                  date: p.date,
              };
          })
  
          setProducts(newProducts);
          console.log("products", products);
      })
      .catch((err) => console.log(err))
  }, [products, url])
    

    return (
    <div className = "cart">
        <div className = "products">
            <Stack spacing = {2}>
                {/* {products.map((product) => {
                    return(
                    <Product />
                    )
                })} */}
                <Product />
                <Product />
                <Product />
            </Stack>
        </div>
        <div className = "receipt">
                <Receipt/>
        </div>
    </div>
    );
};

export default Cart;