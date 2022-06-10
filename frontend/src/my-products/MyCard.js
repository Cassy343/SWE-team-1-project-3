import { Typography, Card, CardMedia, CardActionArea, CardContent, Box} from '@mui/material'
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";

const MyCard = (props) => {
    const {p} = props;

    const reviews = Object.values(p.ratings);
    const avgRating = reviews.length === 0
        ? null
        : reviews
            .map(review => review.rating)
            .reduce((sum, x) => sum + x, 0) / reviews.length;

    return(
    <>
        <Card variant="outlined" sx={{maxWidth: 300, maxHeight: 374}}>
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
            <Typography noWrap sx={{fontSize: 14, mt: 0.2}} color="text.secondary">Posted on {p.date_posted && new Date(p.date_posted.seconds*1000).toDateString()}</Typography>
            <Box sx={{height: 25, mt: 0.6, mb: 1}}>
                {avgRating ? <StarRatings rating={avgRating} starDimension='20px' starSpacing='5px'starRatedColor='rgb(255,215,0)'/>
                : <Typography sx={{fontSize: 14, fontStyle: 'italic'}} color="text.secondary">No reviews yet</Typography>}
            </Box>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
    )
}

export default MyCard;