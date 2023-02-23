import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import "../styles/Product.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCategories } from "../redux/reducers/categories";
import Footer from "../Footer/Footer";

const Products = () => {
  const products = useAppSelector((state) => state.productsReducer);
  const categories = useAppSelector((state) => state.categoryReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState(products);

  const filterProducts = (data: string) => {
    const tempList = products.filter((item) => item.category.name === data);
    setFilter(tempList);
  };
  const sortByPrice = (data: string) => {
    if (data === "asc") {
      setFilter([...filter].sort((a, b) => (a.price > b.price ? 1 : -1)));
    } else {
      setFilter([...filter].sort((a, b) => (a.price < b.price ? 1 : -1)));
    }
  };
  const sortById = () => {
    setFilter([...filter].sort((a, b) => (a.id > b.id ? 1 : -1)));
  };
  function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          id="basic-button"
          color="secondary"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Sort products
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              sortByPrice("asc");
              handleClose();
            }}
          >
            Ascending
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortByPrice("des");
              handleClose();
            }}
          >
            Descending
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortById();
              handleClose();
            }}
          >
            Return to normal
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <Box
      className="container"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      <div className="searchAndFilter">
        <Button
          id="basic-button"
          color="secondary"
          onClick={() => {
            filterProducts("All");
            setFilter(products);
            setCategory("All");
          }}
        >
          {" "}
          All{" "}
        </Button>
        {categories.map((category) => (
          <Button
            id="basic-button"
            color="secondary"
            onClick={() => {
              filterProducts(category.name);
              setCategory(category.name);
            }}
            key={category.id}
          >
            {" "}
            {category.name}{" "}
          </Button>
        ))}
        {BasicMenu()}
      </div>
      <h1 className="font-link" itemID="Category">{`${category}:`}</h1>

      <Grid
        container
        spacing={3}
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        {filter.map((item) => (
          <Grid item xs={4} key={item.id} className="elementWrapper">
            <Box
              className="element"
              sx={{
                backgroundColor: "background.default",
                color: "text.primary",
              }}
            >
              <img
                src={`${item.images}`}
                alt={`${item.title}`}
                className="photo"
              />
              <h3 className="font-link">{item.title}</h3>
              <div>
                <h3 className="font-link">$ {item.price}.0</h3>
              </div>
              <NavLink to={`/product/${item.id}`} className="link1">
                {" "}
                Buy Now
              </NavLink>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Footer></Footer>
    </Box>
  );
};

export default Products;
