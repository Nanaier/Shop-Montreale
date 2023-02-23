import React, { useState } from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  type Swiper as SwiperRef,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import "../styles/Product.css";
import { useAppSelector } from "../redux/hooks";
import Footer from "../Footer/Footer";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Home = () => {
  const products = useAppSelector((state) => state.productsReducer);

  const featured = products.slice(0, 20);

  return (
    <Box
      className="container"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      <div className="HomeImage">
        <div className="slide-effect">
          <NavLink to={"/product"} className="homeLink">
            <h1>
              Shop Now
              <ArrowForwardIosIcon />
            </h1>
          </NavLink>
        </div>
      </div>

      <div className="homeSorter">
        <h1 className="featured">Featured:</h1>
      </div>
      <div className="swiperHome">
        <Swiper
          style={{}}
          id="main"
          tag="section"
          wrapperTag="ul"
          navigation
          spaceBetween={50}
          slidesPerView={4}
        >
          {featured.map((item) => (
            <SwiperSlide key={item.id} tag="li">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <img src={item.images[0]} style={{ listStyle: "none" }} />
                <h3 className="font-link">{item.title}</h3>
                <div>
                  <h3 className="font-link">$ {item.price}.0</h3>
                </div>
                <NavLink to={`/product/${item.id}`} className="link1">
                  Details
                </NavLink>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer></Footer>
    </Box>
  );
};

export default Home;
