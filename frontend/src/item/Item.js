import { Box, Button, Card, IconButton, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../Context";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from "react-router";
import './Item.css';
import StarRatings from "react-star-ratings/build/star-ratings";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '0.3em',
    p: 4
};

const Item = (props) => {
    const location = useLocation();
    const id = location.state?.id;
    const [item, setItem] = useState(null);
    const session = useContext(SessionContext);
    const [removingFromCart, setRemovingFromCart] = useState(false);
    
    useEffect(() => {
        axios.get(`products/info?id=${id}`, {
            headers: {
                'access-token': session.token
            }
        })
            .then(res => {
                console.log(res);
                setItem(res.data)
            })
            .catch(e => console.error(e));
    }, []);

    if (!item) {
        return (<></>);
    }

    const reviews = Object.values(item.ratings);
    const avgRating = reviews.length === 0
        ? null
        : reviews
            .map(review => review.rating)
            .reduce((sum, x) => sum + x, 0) / reviews.length;

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
            id='item-image'
        />
        <Card
            sx={{
                width: '20vw',
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
                session.cart[id]
                ? <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                >
                    <IconButton
                        size='small'
                        onClick={() => {
                            if (session.cart[id].qty === 1) {
                                setRemovingFromCart(true);
                            } else {
                                props.removeOneFromCart(id);
                            }
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{session.cart[id].qty} added</Typography>
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
            {
                avgRating === null
                ? <Box>
                    <Typography>This item does not have any ratings yet. Be the first to rate this item!</Typography>
                </Box>
                : <Box>
                    <StarRatings
                        rating={avgRating}
                        starDimension='35px'
                        starSpacing='5px'
                        starRatedColor='rgb(255,215,0)'
                    />
                    <Typography
                        color='text.secondary'
                        sx={{ fontSize: '0.75rem' }}
                    >Based on {reviews.length} rating{reviews.length !== 1 ? 's' : ''}</Typography>
                </Box>
            }
            <Box height='2rem' />
            <Typography color='text.secondary'>This item was posted by {item.sellerName}</Typography>
        </Card>

        <Modal
            open={removingFromCart}
            onClose={() => setRemovingFromCart(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography
                    variant='h4'
                >Are you sure you want to remove this item from your cart?</Typography>
                <Box height='1rem' />
                <Typography
                    color='text.secondary'
                    sx={{ fontSize: '1.5em' }}
                >Click outside the box to cancel.</Typography>
                <Box height='1rem' />
                <Button
                    color='error'
                    onClick={() => {
                        setRemovingFromCart(false);
                        props.removeOneFromCart(id);
                    }}
                    variant='contained'
                >Confirm</Button>
            </Box>
        </Modal>
    </Box>);
};

export default Item;