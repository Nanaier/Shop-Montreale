import React, { useEffect, useState } from "react";
import { Box, Button, FormHelperText, Input, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authenticate } from "../redux/reducers/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const navigation = useNavigate();
  useEffect(() => {
    if (user) navigation("/profile");
  }, [user, navigation]);
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    try {
      const responce = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      const token = responce.data;
      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      className="loginPage"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      <h1 className="font-link" style={{ padding: 20 }}>
        Login into the account
      </h1>
      <Box
        className="loginField"
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <FormControl sx={{ p: 1 }} color="secondary">
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            type="email"
            id="my-input"
            aria-describedby="my-helper-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ p: 1 }} color="secondary">
          <InputLabel htmlFor="myInput1">Password</InputLabel>
          <Input
            type="password"
            id="myinput1"
            aria-describedby="my-helper-text1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id="my-helper-text1">
            We'll never share your password.
          </FormHelperText>
        </FormControl>
        <Button
          color="secondary"
          variant="outlined"
          onClick={onSubmit}
          sx={{ p: 1 }}
        >
          Login
        </Button>
        <NavLink to={"/register"} className="link">
          Register a new user
        </NavLink>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default Login;
