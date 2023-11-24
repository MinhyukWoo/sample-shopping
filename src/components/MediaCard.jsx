import {
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Card,
} from "@mui/material";

function MediaCard({ imageUrl, title, description }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "1rem 0rem" }}>
      <CardMedia
        sx={{ height: 140, "background-size": "auto" }}
        image={imageUrl}
        title={title}
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default MediaCard;
