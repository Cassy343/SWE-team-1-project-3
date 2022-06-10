import { Box, Button, Card, IconButton, Modal, Typography, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { SessionContext } from "../Context";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from "react-router";
import './Item.css';
import StarRatings from "react-star-ratings/build/star-ratings";
const {Timestamp} = require("firebase/firestore")

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
    const [reviewing, setReviewing] = useState(false);
    const [rating, setRating] = useState(0);
    const textRef = useRef();
    
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
    
    const entries = Object.entries(item.ratings);
    entries.sort((a,b) => {
        return b[1].date.seconds - a[1].date.seconds
    })
    
    return (
    <>
    <Box
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
            {
                item.ratings[session.uid]
                ? 
                // <Box>
                //     <Typography>You rated this item:</Typography>
                //     <StarRatings
                //         rating={item.ratings[session.uid].rating}
                //         starDimension='35px'
                //         starSpacing='5px'
                //         starRatedColor='rgb(255,215,0)'
                //     />
                // </Box>
                <Button disabled>Add Review</Button>
                : <Button onClick={() => setReviewing(true)}>Add Review</Button>
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

        <Modal
            open={reviewing}
            onClose={() => {
                setRating(0);
                setReviewing(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography
                    variant='h5'
                >Leave a Review:</Typography>
                <Box height='1rem' />
                <StarRatings
                    rating={rating}
                    changeRating={newRating => setRating(newRating)}
                    starDimension='35px'
                    starSpacing='5px'
                    starRatedColor='rgb(255,215,0)'
                    starHoverColor='rgb(255,215,0)'
                />
                <Box height='1rem' />
                <TextField multiline rows={4} fullWidth inputRef={textRef}/>
                <Typography
                    color='text.secondary'
                    sx={{ fontSize: '1em', mt: 1.5 }}
                >Click outside the box to cancel.</Typography>
                <Box height='1rem' />
                <Button
                    color='success'
                    onClick={() => {
                        const newRatings = { ...item.ratings };
                        const review = {
                            rating: rating,
                            text_review: textRef.current.value,
                            date: Timestamp.fromDate(new Date())
                        };
                        newRatings[session.uid] = review;
                        console.log(newRatings);
                        setItem({
                            ...item,
                            ratings: newRatings
                        });
                        setReviewing(false);
                        axios.put(`products/ratings?id=${id}`, review, {
                            headers: {
                                'access-token': session.token
                            }
                        });
                    }}
                    variant='contained'
                >Confirm</Button>
            </Box>
        </Modal>
    </Box>

    <Stack spacing={2} sx={{ml:18, mr:18, mb:10}}>
        {entries.map(user => <UserReview uid={user[0]} values={user[1]}/>)}
    </Stack>
    </>
    );
};

const UserReview = (props) => {
    const session = useContext(SessionContext);
    const {uid, values} = props;
    const [name, setName] = useState();
    console.log(values.date)

    useEffect(() => {
        fetch("users?id=" + uid)
        .then((res) => res.json())
        .then((text) => setName(text))
    }, [])

    return(
    <>
    <Card variant="outlined">
        {session.uid===uid ? 
            <Typography variant="h6" sx={{ml: 3, mt: 1.5}}>{name} (me)</Typography>
        : <Typography variant="h6" sx={{ml: 3, mt: 1.5}}>{name}</Typography>
        }
            
        <Box sx={{ml: 3, mt: 0.5}}>
        <StarRatings
            rating={values.rating}
            starDimension='25px'
            starSpacing='5px'
            starRatedColor='rgb(255,215,0)'
        />
        </Box>

        <Typography sx={{ml: 3, mt: 0.5}}>{values.text_review}</Typography>
        <Typography sx={{fontSize: 14, mt: 0.5, ml: 3, mb: 1.8}} color="text.secondary">Reviewed on {new Date(values.date.seconds*1000).toDateString()}</Typography>
    </Card>
    </>
    )
}

export default Item;