import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../Context";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from "react-router";

const Item = (props) => {
    const location = useLocation();
    const id = location.state?.id;
    const [item, setItem] = useState(null);
    const session = useContext(SessionContext);
    
    useEffect(() => {
        // axios.get(`products?id=${props.id}`)
        //     .then(res => setItem(res.data()))
        //     .catch(e => console.error(e));
        setItem({
            date_posted: new Date(),
            description: 'black gel pens',
            name: '10-pack pens',
            image: 'https://i5.walmartimages.com/asr/ccdd2273-3a13-4d2d-9123-c2b3fabdf396.23cbb880147069a22b93c92b86a9ca06.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            price: 5.99,
            seller: {
                id: 'az0yvB7JE0zHkk7mGTCb',
                uid: 'PiO0LdBIBGOEpDvm2bt1H86G9Au2',
                name: 'Ian'
            }
        });
    }, []);

    if (!item) {
        return (<></>);
    }

    return (<Box
        width='100vw'
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='flex-start'
        padding='3rem'
    >
        <img
            src={item.image}
            alt={item.name}
        />
        <Card
            sx={{
                minWidth: '20vw',
                minHeight: '25vh',
                padding: '1rem'
            }}
        >
            <Typography variant='h3'>{item.name}</Typography>
            <Typography variant='h2'>${item.price}</Typography>
            <Box height='1rem' />
            <Typography>{item.description}</Typography>
            <Box height='2rem' />
            {
                session.cart[props.id]
                ? <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                >
                    <IconButton
                        size='small'
                        onClick={() => props.removeOneFromCart(id)}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{session.cart[props.id].qty} added</Typography>
                    <IconButton
                        size='small'
                        onClick={() => props.addToCart(id, item)}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
                : <Button
                    variant='contained'
                    onClick={() => props.addToCart(id, item)}
                >Add to Cart</Button>
            }
            <Box height='2rem' />
            <Typography color='text.secondary'>This item was posted by {item.seller.name}</Typography>
        </Card>
    </Box>);
};

export default Item;