import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { SessionContext } from '../Context'

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FileInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

const MyProducts = (props) => {

  const session = useContext(SessionContext);
  const url = "products?user=" + session.uid;

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductDescription, setNewProductDescription] = useState(0);
  const [newProductImage, setNewProductImage] = useState(null);
  const [products, setProducts] = useState([]);

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
    })
    .catch((err) => console.log(err))
}, [])

  const createProduct = async () => {
    console.log(newProductName);
    console.log(newProductDescription);
    console.log(newProductPrice);
    console.log(newProductImage);
    if(newProductImage) {
      const res = await axios.post("products", {
        name: newProductName,
        price: newProductPrice,
        description: newProductDescription,
        image: newProductImage,
        date: new Date(),
      })
      setProducts([...products, res.data]);
    }
  }
  const handleFileInput = (e) => {
    setNewProductImage(e.target.files[0]);
}

  return (<div style={{ textAlign: 'center', marginLeft: '70px', marginRight: '70px', marginBottom: '70px'}}>
      <h1>My Products</h1>
      <br></br>
      <br></br>
      <Grid container spacing={4} sx={{textAlign: 'left'}}>
        <Box component="span" sx={{ p: 2, border: 2, px: 3.5 }}>
          <Grid item xs>
          <p><b>Add a new product:</b></p>
          <TextField
          id="standard-basic" 
          variant="standard"
          helperText = "Product Name"
          onChange={(e) => setNewProductName(e.target.value)}
          inputProps={{ defaultValue: null }}
          />
          <br></br>
          <FormControl variant="standard">
            <FileInput
              id="standard-adornment-amount"
              helperText = "Product Price ($)"
              onChange={(e) => setNewProductPrice(Number(e.target.value).toFixed(2))}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <FormHelperText id="price-helper-text">Price</FormHelperText>
          </FormControl>
          <br></br>
          <TextField multiline
          id="standard-basic" 
          variant="standard"
          helperText = "Product Description"
          onChange={(e) => setNewProductDescription(e.target.value)}
          inputProps={{ defaultValue: null }}
          />
          <br></br><br></br>
          <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileInput}/>
          <Button variant="outlined" component="span">Upload Image</Button>
          </label>
          {newProductImage ? <p style={{ fontSize: 12 }}>{newProductImage.name}</p>:<p style={{ fontSize: 12 }}> </p>}
          <br></br>
          <Button variant="contained" sx= {{  }} onClick={createProduct}>Post</Button>
          <p></p>
          </Grid>
        </Box>
      <Grid item xs>
      <Grid container spacing={4} sx={{textAlign: 'left'}}>
        <Grid item xs = {2.5}>
        <Box>
          <Card sx={{ maxWidth: 200}}>
          <CardActionArea component={Link} to="/item" state={{ }} >
              <CardMedia
              component="img"
              height="140"
              alt="Cover Image"
              image={"https://team1ecommerceapp.s3.amazonaws.com/pens.jpeg"}
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Pens
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  $5.99
                  </Typography>
              </CardContent>
          </CardActionArea>
          </Card>
        </Box>
        </Grid>

        {products.map((p) =>
        <Grid item xs = {2.5}>
        <Box>
          <Card sx={{ maxWidth: 200}}>
          <CardActionArea component={Link} to="/item" state={{ id: p.id }} >
              <CardMedia
              component="img"
              height="140"
              alt="Cover Image"
              image={p.image}
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  ${p.price}
                  </Typography>
              </CardContent>
          </CardActionArea>
          </Card>
        </Box>
        </Grid>
      )}
      </Grid>
      </Grid>
    </Grid>
  </div>);
};

export default MyProducts;