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
  const url = "http://localhost:8000/products?user=PiO0LdBIBGOEpDvm2bt1H86G9Au2";
  

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductDescription, setNewProductDescription] = useState(0);
  const [newProductImage, setNewProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState([0])
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress , setProgress] = useState(0);

  useEffect(() => {
    console.log("reloading")
    fetch(url)
    .then((res) => res.json())
    .then((text) => setProducts(text.result))
    .catch((err) => console.log(err))
}, [change])

  const createProduct = async () => {

    /* IF AWS WORKS
    const ReactS3Client = new S3(config)
    ReactS3Client.uploadFile(file, file.name)
      .then(data => setNewProductImage(data.location))
      .catch(err => console.error(err))
    */

    //if(newProductImage) {
      const res = await axios.post(url, {
        name: newProductName,
        price: newProductPrice,
        description: newProductDescription,
        image: newProductImage,
      })
      setProducts([...products, res.data]);
      setChange(change + 1);
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
              onChange={(e) => setNewProductPrice(Number(e.target.value))}
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
          <br></br>
          {/*ALTERNATIVE TO AWS*/}
          <TextField multiline
          id="standard-basic" 
          variant="standard"
          helperText = "Product Image Link"
          onChange={(e) => setNewProductImage(e.target.value)}
          inputProps={{ defaultValue: null }}
          />
          <br></br><br></br>

          {/*IF AWS WORKS*/}
          {/*
          <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleFileInput}/>
          <Button variant="outlined" component="span">Upload Image</Button>
          </label>
          {selectedFile ? <p style={{ fontSize: 12 }}>{selectedFile.name}</p>:<p style={{ fontSize: 12 }}> </p>}
          */}

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
                  {p.price &&
                  <Typography variant="body2" color="text.secondary">
                  ${p.price.toFixed(2)}
                  </Typography>}
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