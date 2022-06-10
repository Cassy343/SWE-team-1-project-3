import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { SessionContext } from '../Context'

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FileInput from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Select, InputLabel, MenuItem} from '@mui/material'
import Helmet from 'react-helmet';

const MyProducts = (props) => {

  const session = useContext(SessionContext);
  const {categories} = props;
  const textInput1 = React.useRef(null);
  const textInput2 = React.useRef(null);
  const textInput3 = React.useRef(null);
  const textInput4 = React.useRef(null);

  const [newProductName, setNewProductName] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);
  const [newProductDescription, setNewProductDescription] = useState(null);
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductCategory, setNewProductCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState([0])
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    desc: false,
    img: false,
    category: false
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch("products", {
      headers: {
          'access-token': session.token
      }
  })
    .then((res) => res.json())
    .then((text) => {
      const newProducts = text.result.map(p => {
          return {
              id: p.id,
              sellerName: p.sellerName,
              name: p.data.name,
              image: p.data.image,
              description: p.data.description,
              price: p.data.price,
              date_posted: p.data.date_posted,
              ratings: p.data.ratings,
              seller: p.data.seller
          };
      })
      .sort((a,b) => {return b.date_posted.seconds-a.date_posted.seconds});
      setProducts(newProducts);
  })
    .catch((err) => console.log(err))
}, [change])

  const createProduct = async () => {
    let newErrors = {
      name: false,
      price: false,
      desc: false,
      img: false,
      category: false
    };

    if (!newProductName) {
      newErrors.name = true;
    }

    if (!newProductPrice) {
      newErrors.price = true;
    }

    if (!newProductDescription) {
      newErrors.desc = true;
    }

    if (!newProductImage) {
      newErrors.img = true;
    }

    if (!newProductCategory) {
      newErrors.category = true;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).filter(x => x).length > 0) {
      setErrorMsg("One or more fields still need to be filled in.")
      return;
    } else {
      setErrorMsg(null);
    }
      const res = await axios.post(
        "products",
        {
          name: newProductName,
          price: newProductPrice,
          description: newProductDescription,
          image: newProductImage,
          category: newProductCategory,
        },
        {
        headers: {
        'access-token': session.token
        }
        })
      setProducts([...products, res.data]);
      setChange(change + 1);

      setNewProductName(null);
      setNewProductPrice(null);
      setNewProductDescription(null);
      setNewProductImage(null);
      setNewProductCategory(null);
      textInput1.current.value = "";
      textInput2.current.value = "";
      textInput3.current.value = "";
      textInput4.current.value = "";
  }

  return (<>
  <Helmet><title>Ushop | My Products</title></Helmet>
  <div style={{  marginLeft: '70px', marginRight: '70px', marginBottom: '70px'}}>
    <br></br>
    <Grid sx={{ marginTop: '1%'}} container spacing={3}>
      <Grid item xs ={3}>
        <div style={{  textAlign: 'center',}}>
        <Card variant="outlined" sx={{width: '300px'}}>
          <CardContent>
            <br></br>
            <Typography color='#709C79' variant='h6'>Add a new product:</Typography>
            <TextField
            sx={{ width: '83%' }}
            id="standard-basic" 
            variant="standard"
            type="text"
            helperText = "Product Name"
            onChange={(e) => setNewProductName(e.target.value)}
            inputProps={{ defaultValue: null }}
            error={errors.name}
            inputRef={textInput1}
            />
            <FormControl variant="standard" sx={{ width: '83%' }}>
              <FileInput
              id="standard-adornment-amount"
              helperText = "Product Price ($)"
              onChange={(e) => setNewProductPrice(Number(e.target.value))}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              error={errors.price}
              type="number"
              inputRef={textInput2}
              />
              <FormHelperText id="price-helper-text">Price</FormHelperText>
            </FormControl>
            <TextField multiline
            sx={{ width: '83%' }}
            id="standard-basic" 
            variant="standard"
            helperText = "Product Description"
            onChange={(e) => setNewProductDescription(e.target.value)}
            inputProps={{ defaultValue: null }}
            error={errors.desc}
            inputRef={textInput3}
            />
            <TextField
            sx={{ width: '83%' }}
            id="standard-basic" 
            variant="standard"
            helperText = "Product Image Link"
            onChange={(e) => setNewProductImage(e.target.value)}
            inputProps={{ defaultValue: null }}
            error={errors.img}
            inputRef={textInput4}
            />
            <FormControl variant="standard" sx={{width: '83%', m: 2}}>
              <InputLabel id="cat-label">Category</InputLabel>
              <Select
              labelId="cat-label" 
              label="Category" 
              value={newProductCategory} 
              sx={{textAlign: 'left'}}
              onChange={(e) => setNewProductCategory(e.target.value)}
              error={errors.category}
              >
                {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <br></br>
            {
              errorMsg && <>
                <Typography
                  color="error"
                  sx={{ fontSize: '1rem', marginLeft: '25px', marginRight: '25px' }}
                >{errorMsg}</Typography>
                <br></br>
              </>
            }
            <br></br>
            <Button variant="contained" onClick={createProduct}>Post</Button>
          </CardContent>
        </Card>
        </div>
      </Grid>
      <Grid item xs ={9}>
        <Grid  container spacing={3}>
          {products.map((p) =>
            <Grid item key={p.id} xs = {4}>
              <Card variant="outlined" sx={{maxWidth: 300, maxHeight: 350}}>
                <CardActionArea component={Link} to="/item" state={{ id: p.id }} >
                  <CardMedia
                  component="img"
                  height="240"
                  width="100%"
                  image={p.image}
                  alt={p.name}
                  title={p.name} 
                  />
                  <CardContent sx={{backgroundColor: '#f5f5f5'}}>
                    <Typography noWrap sx={{fontWeight: 'bold'}} variant="h6">{p.name}</Typography>
                    <Typography>${p.price}</Typography>
                    <Typography noWrap sx={{fontSize: 14}} color="text.secondary">Posted on {p.date_posted && new Date(p.date_posted.seconds*1000).toDateString()}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  </div>
  </>);
};

export default MyProducts;