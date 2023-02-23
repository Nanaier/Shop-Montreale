import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CartProduct } from "../types/cartType";
import {
  addToCart,
  deleteFromCart,
  reduceFromCart,
} from "../redux/reducers/cart";
import Footer from "../Footer/Footer";

const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cartProductsReducer);
  const dispatch = useAppDispatch();
  const startTotal = () =>
    cartProducts.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0
    );
  const [total, setTotal] = useState(startTotal());
  useEffect(() => {
    startTotal();
    setTotal(startTotal());
  }, [cartProducts]);
  const Cnt = (item: CartProduct) => {
    return (
      <div>
        <h3 className="font-link">Amount: {item.quantity}</h3>
        <ButtonGroup>
          <Button
            color="secondary"
            aria-label="reduce"
            onClick={() => {
              if (item.quantity === 1) {
                onDelete(item);
              } else {
                const obj: CartProduct = { product: item.product, quantity: 1 };
                dispatch(reduceFromCart(obj));
              }
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            color="secondary"
            aria-label="increase"
            onClick={() => {
              const obj: CartProduct = { product: item.product, quantity: 1 };
              dispatch(addToCart(obj));
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    );
  };
  const onDelete = (item: CartProduct) => {
    dispatch(deleteFromCart(item.product.id));
  };
  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      <h1 className="font-link">Cart</h1>
      <h1 className="font-link">Total: {total}</h1>
      <Grid container spacing={2}>
        {cartProducts.map((item) => (
          <Grid item xs={3} key={item.product.id} className="element">
            <div className="wrapper">
              <Button
                aria-label="delete"
                onClick={() => {
                  onDelete(item);
                  setTotal(0);
                }}
              >
                <ClearIcon fontSize="small" color="secondary" />
              </Button>
              <img
                src={`${item.product.images}`}
                alt={`${item.product.title}`}
                className="photo"
              />
              <h3 className="font-link">{item.product.title}</h3>
              <div>
                <h3 className="font-link">$ {item.product.price}.0</h3>
                {Cnt(item)}
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      <Footer></Footer>
    </Box>
  );
};

export default Cart;
