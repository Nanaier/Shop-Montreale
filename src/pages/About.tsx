import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Product } from "../types/productsType";
import { CartProduct } from "../types/cartType";
import "../styles/About.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/reducers/cart";
import {
  addToBookmarks,
  deleteFromBookmarks,
} from "../redux/reducers/bookmarks";
import Footer from "../Footer/Footer";

const About = (props: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const bookmarks = useAppSelector((state) => state.bookmarksReducer);
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [count, setCount] = useState(0);
  const [item, setItem] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [clicked, setClicked] = useState(false);

  const Loading = () => {
    return (
      <Stack spacing={4}>
        <Skeleton animation="wave" variant="rounded" height={100} />
        <Skeleton animation="wave" variant="rounded" height={100} />
        <Skeleton animation="wave" variant="rounded" height={100} />
      </Stack>
    );
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const responce = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`
      )
        .then((responce) => responce.json())
        .then((responce) => responce);
      setProduct(responce);
      setItem(responce);
      setLoading(false);
    };
    const CheckBookmark = () => {
      if (bookmarks.find((product) => product.id === Number(id!))) {
        setClicked(true);
      }
    };
    CheckBookmark();
    getProduct();
  }, [id]);
  const handleIconClick = (id: string) => {
    if (clicked === false) {
      setClicked(true);
      dispatch(addToBookmarks(product!));
    } else {
      setClicked(false);
      dispatch(deleteFromBookmarks(product!.id));
    }
  };
  return (
    <Box
      className="containerAbout"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      {loading ? (
        <Loading />
      ) : (
        <Grid
          container
          spacing={1}
          className="container"
          sx={{
            backgroundColor: "background.default",
            color: "text.primary",
            p: 5,
          }}
        >
          <Grid item xs={12} sm={5}>
            <img
              src={`${product?.images}`}
              alt="qwer"
              className="photoAbout"
              width={500}
            />
          </Grid>
          <Grid item xs={12} sm={7} className="containerDesc">
            <div className="buttons">
              <h1 className="font-link">{`${product?.title}`}</h1>

              <h1 className="font-link">$ {`${product?.price}`}.0</h1>
              <h1 className="font-link"> {`Quantity: ${count}`}</h1>
              <ButtonGroup variant="text">
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 0));
                  }}
                  color="secondary"
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  color="secondary"
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              <Button
                color="secondary"
                onClick={() => {
                  const obj: CartProduct = { product: item!, quantity: count };
                  props.setCount(count + props.count);
                  if (count > 0) {
                    setCount(0);
                    dispatch(addToCart(obj));
                  }
                }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => {
                  handleIconClick(id!);
                }}
              >
                {clicked ? (
                  <BookmarkIcon color="secondary" />
                ) : (
                  <BookmarkIcon />
                )}
              </IconButton>
            </div>

            <h3 className="font-link">Description:</h3>
            <p className="font-link">{`${product?.description}`}</p>
          </Grid>
        </Grid>
      )}
      <Footer></Footer>
    </Box>
  );
};

export default About;
