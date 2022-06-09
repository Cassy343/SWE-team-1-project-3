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
import Modal from '@mui/material/Modal';
import { Select, InputLabel, MenuItem} from '@mui/material'
import Helmet from 'react-helmet';
//import AWS from 'aws-sdk';
//import S3 from 'react-aws-s3'


const Input = styled('input')({
  display: 'none',
});

const s3bucket = process.env.s3bucket;
const region = process.env.region;
const accessKey = process.env.accessKey;
const secretAccessKey = process.env.secretAccessKey;

const config = {
  bucketName: s3bucket,
  region: region,
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
}

const MyProducts = (props) => {

  const session = useContext(SessionContext);
  const url = "http://localhost:8000/products/";
  const {categories} = props;
  

  const [newProductName, setNewProductName] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);
  const [newProductDescription, setNewProductDescription] = useState(null);
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductCategory, setNewProductCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState([0])
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress , setProgress] = useState(0);
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
      const newProducts = text.result.map(p => { console.log(p.id);
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
      .sort(sortByDate);
      setProducts(newProducts);
  })
    .catch((err) => console.log(err))
}, [change])

const sortByDate = (productA, productB) => {
  return productA.date_posted < productB.date_posted
      ? -1
      : (productA.date_posted > productB.date_posted ? 1 : 0);
};

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

    /* IF AWS WORKS
    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, file.name)
      .then(data => setNewProductImage(data.location))
      .catch(err => console.error(err))
    */

    //if(newProductImage) {
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
    //}
  }

  /*
  AWS.config.update({
    accessKey: process.env.accessKey,
    secretAccessKey: process.env.secretAccessKey,
  })
  const myBucket = new AWS.S3({
    params: {Bucket: s3bucket},
    region: region,
})
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])  
  }
  */

  return (<>
  <Helmet><title>Ushop | My Products</title></Helmet>
  <div style={{  marginLeft: '70px', marginRight: '70px', marginBottom: '70px'}}>
      <br></br>
      <br></br>
      <br></br>
      <Grid sx={{ marginTop: '1%'}} container spacing={3}>
      <Grid item xs ={3}>
      <div style={{  textAlign: 'center',}}>
      <Card variant="outlined" sx={{width: '300px'}}>
        <CardContent>
          <p><b>Add a new product:</b></p>
          <TextField
          sx={{ width: '83%' }}
          id="standard-basic" 
          variant="standard"
          helperText = "Product Name"
          onChange={(e) => setNewProductName(e.target.value)}
          inputProps={{ defaultValue: null }}
          error={errors.name}
          />
          <br></br>
          <FormControl variant="standard" sx={{ width: '83%' }}>
            <FileInput
              id="standard-adornment-amount"
              helperText = "Product Price ($)"
              onChange={(e) => setNewProductPrice(Number(e.target.value))}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              error={errors.price}
            />
            <FormHelperText id="price-helper-text">Price</FormHelperText>
          </FormControl>
          <br></br>
          <TextField multiline
          sx={{ width: '83%' }}
          id="standard-basic" 
          variant="standard"
          helperText = "Product Description"
          onChange={(e) => setNewProductDescription(e.target.value)}
          inputProps={{ defaultValue: null }}
          error={errors.desc}
          />
          <br></br>
          {/*ALTERNATIVE TO AWS*/}
          <TextField multiline
          sx={{ width: '83%' }}
          id="standard-basic" 
          variant="standard"
          helperText = "Product Image Link"
          onChange={(e) => setNewProductImage(e.target.value)}
          inputProps={{ defaultValue: null }}
          error={errors.img}
          />
          <br></br>

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
                {categories.map(c => <MenuItem value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
          <br></br><br></br>
          {/*IF AWS WORKS*/}
          {/*
          <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileInput}/>
          <Button variant="outlined" component="span">Upload Image</Button>
          </label>
          {selectedFile ? <p style={{ fontSize: 12 }}>{selectedFile.name}</p>:<p style={{ fontSize: 12 }}> </p>}
          */}

          {
            errorMsg && <>
              <Typography
                color="error"
                sx={{ fontSize: '1rem' }}
              >{errorMsg}</Typography>
              <br></br>
            </>
          }
          
          <Button variant="contained" sx= {{  }} onClick={createProduct}>Post</Button>
 
          </CardContent>
        </Card>
        </div>
        </Grid>
      <Grid item xs ={9}>
      <Grid  container spacing={3}>
        {products.map((p) =>
        <Grid item xs = {4}>
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