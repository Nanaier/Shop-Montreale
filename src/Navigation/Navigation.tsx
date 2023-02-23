import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  NavLink,

} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  IconButton,
  Badge,
  Autocomplete,
  Box,
  TextField,
  styled,
  Avatar,
  createFilterOptions,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

import "./Navigation.css";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import About from "../pages/About";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/reducers/products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { authenticate } from "../redux/reducers/auth";
import { Product } from "../types/productsType";
import {
  ColorModeContext,
} from "../ThemeSwitcher/ThemeSwitcher";

const Navigation = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cartProducts = useAppSelector((state) => state.cartProductsReducer);
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const badgeCount = () =>
    cartProducts.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const [count, setCount] = useState(badgeCount());

  useEffect(() => {
    badgeCount();
    setCount(badgeCount());
  }, [cartProducts]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authenticate(token));
    }
  }, []);

  const products = useAppSelector((state) => state.productsReducer);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 20,
  });
  const Autocomplete1 = styled(Autocomplete)({
    ".MuiAutocomplete-inputRoot": {
      color: "purple",
      backgroundColor: "#f2f2f2",
      "& .MuiInputAdornment-root": {
        color: "purple",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "purple",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "purple",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "purple",
      },
    },
  }) as typeof Autocomplete;
  function ProductSelect() {
    return (
      <Autocomplete1
        forcePopupIcon={false}
        id="product-select-demo"
        sx={{ width: 300 }}
        options={products}
        filterOptions={filterOptions}
        autoHighlight
        getOptionLabel={(option) => (option as Product).title}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={(option as Product).id}
          >
            <img
              loading="lazy"
              width="20"
              src={(option as Product).images[0]}
              alt=""
            />
            <NavLink to={`/product/${(option as Product).id}`} className="link">
              {(option as Product).title}{" "}
            </NavLink>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            sx={{ color: "text.primary" }}
            color="secondary"
            {...params}
            label="Search for your product"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        )}
      />
    );
  }
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <BrowserRouter>
      <nav className="navMenu">
        <div className="navBar">
          <div className="siteName">
            <NavLink to={"/"} className="siteName">
              <h1>Montreale</h1>
            </NavLink>
          </div>
          <div className="links">
            <div className="mainLinks">
              {ProductSelect()}
              <Link to="/">
                <h2 className="font-link">Home</h2>
              </Link>
              <Link to="/product">
                <h2 className="font-link">Products</h2>
              </Link>
              <Link to="/profile" className="profile">
                <h2 className="font-link">Profile</h2>
              </Link>
              <Link to="/cart">
                <h1 className="font-link">
                  <IconButton sx={{ p: 0 }}>
                    <Badge color="secondary" badgeContent={count}>
                      <ShoppingCartIcon
                        fontSize="large"
                        color="inherit"
                        style={{ color: "#f6f4e6" }}
                        className="cart"
                      />
                    </Badge>
                  </IconButton>
                </h1>
              </Link>
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              {!!user ? (
                <Link to="/profile">
                  <Avatar src={user.avatar}></Avatar>
                </Link>
              ) : (
                <Link to="/login">
                  <Avatar src="/broken-image.jpg"></Avatar>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/product/:id"
          element={<About count={count} setCount={setCount} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
