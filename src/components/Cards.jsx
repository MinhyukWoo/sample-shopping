import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "./MediaCard";

const styleItemCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
    <Stack
      direction="column"
      alignItems="center"
      sx={{ width: "fit-content", margin: "auto" }}
    >
      {products.map((product) => (
        <MediaCard
          key={`product_${product.id}`}
          imageUrl={`${imageUrl}/${product.id}`}
          title={product.name}
          description={product.description}
        ></MediaCard>
      ))}
      <Grid container sx={{ width: "100%" }}>
        <Grid xs style={styleItemCenter}>
          {offset >= limit && (
            <Button
              onClick={() => {
                setOffset((val) => (val - limit >= 0 ? val - limit : 0));
                window.scrollTo(0, 0);
              }}
            >
              이전
            </Button>
          )}
        </Grid>

        <Grid xs={3} style={styleItemCenter}>
          <Typography>{1 + offset / limit}</Typography>
        </Grid>
        <Grid xs style={styleItemCenter}>
          {isLastPage || (
            <Button
              onClick={() => {
                setOffset((val) => val + limit);
                window.scrollTo(0, 0);
              }}
            >
              다음
            </Button>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Cards;
