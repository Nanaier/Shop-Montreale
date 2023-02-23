import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { NavLink, useNavigate } from "react-router-dom";
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

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/reducers/auth";
import Footer from "../Footer/Footer";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Profile = () => {
  const bookmarks = useAppSelector((state) => state.bookmarksReducer);
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      {user && (
        <>
          <Grid container className="profilePage" spacing={2} sx={{ p: 5 }}>
            <Grid item xs={12} sm={4}>
              <div className="profileAvatar">
                <img src={user.avatar} alt="" className="avatar" />
                <p>{user.name}</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} sx={{ p: 5 }} className="userProfile">
              <>
                <h1>User info here:</h1>
                <hr />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="infoProfile"
                    style={{ textAlign: "left", padding: "30px 0" }}
                  >
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                  </div>
                  <Button
                    color="secondary"
                    onClick={() => {
                      dispatch(logOut());
                      navigation("/login");
                    }}
                  >
                    Log out
                  </Button>
                </div>
                <hr />
                <h1>Bookmarks:</h1>

                <Swiper
                  style={{}}
                  id="main"
                  tag="section"
                  wrapperTag="ul"
                  navigation
                  spaceBetween={50}
                  slidesPerView={4}
                >
                  {bookmarks.map((item) => (
                    <SwiperSlide key={item.id} tag="li">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <img
                          src={item.images[0]}
                          style={{ listStyle: "none" }}
                        />
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
                <hr />
              </>
            </Grid>
          </Grid>
          <Footer></Footer>
        </>
      )}
    </Box>
  );
};

export default Profile;
