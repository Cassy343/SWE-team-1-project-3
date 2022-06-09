import { Typography, Card, CardMedia, CardActionArea, CardContent, useTheme } from '@mui/material'
import {Link} from "react-router-dom";

const ProductCard = (props) => {
    const data = props.product.data;
    const id = props.product.id;
    const sellerName = props.product.sellerName;

    const theme = useTheme();

    return (
    <>
        <Card variant="outlined" sx={{maxWidth: 300, maxHeight: 350}}>
        <CardActionArea component={Link} to="/item" state={{ id: id }}>
            <CardMedia
                component="img"
                height="240"
                width="100%"
                image={data.image}
                alt={data.name}
                title={data.name} 
            />
        
            <CardContent sx={{backgroundColor: '#f5f5f5'}}>
                <Typography noWrap sx={{fontWeight: 'bold'}} variant="h6">{data.name}</Typography>
                <Typography>${data.price}</Typography>
                <Typography noWrap sx={{fontSize: 14}} color="text.secondary">By {sellerName} on {new Date(data.date_posted.seconds*1000).toDateString()}</Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </>
    )
}

export default ProductCard;