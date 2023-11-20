import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";

function Cards() {
  const limit = 10;
  const imageUrl = process.env.REACT_APP_API_BASE + "/shopping/products/image";
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  useEffect(() => {
    const url = process.env.REACT_APP_API_BASE + "/shopping/products";
    axios
      .get(`${url}?offset=${offset}&limit=${limit}`)
      .then((value) => {
        setProducts(value.data.items);
        setIsLastPage(!value.data.links.map(({ rel }) => rel).includes("next"));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [offset]);

  return (
    <Stack direction="column" alignItems="center">
      {products.map((product) => (
        <Card
          key={`product-${product.id}`}
          sx={{ maxWidth: 345, margin: "1rem 0rem" }}
        >
          <CardMedia
            sx={{ height: 140, "background-size": "auto" }}
            image={`${imageUrl}/${product.id}`}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
      <Grid container>
        {offset >= 10 && (
          <Grid xs>
            <Button
              onClick={() => {
                setOffset((val) => (val - 10 >= 0 ? val - 10 : 0));
                window.scrollTo(0, 0);
              }}
            >
              이전
            </Button>
          </Grid>
        )}
        {isLastPage || (
          <Grid xs>
            <Button
              onClick={() => {
                setOffset((val) => val + 10);
                window.scrollTo(0, 0);
              }}
            >
              다음
            </Button>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}

export default Cards;
