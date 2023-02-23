import React, { useState } from "react";
import { Box, Button, FormHelperText, Input, InputLabel } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { authenticate } from "../redux/reducers/auth";
import Footer from "../Footer/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setFirstName] = useState("");

  const dispatch = useAppDispatch();
  const onSubmit1 = async () => {
    try {
      const responce = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      const token = responce.data;
      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
    } catch (e) {
      console.log(e);
    }
  };
  interface IFormInput {
    firstname: string;
  }

  const userSchema = yup.object({
    firstname: yup.string().required(),
  });

  const { register } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const avatar = "https://api.lorem.space/image/face?w=640&h=480&r=5030";
      const responce = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        { email, password, name, avatar }
      );
      onSubmit1();
      const result = responce.data;
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  // }

  return (
    <Box
      className="loginPage"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      <h1 className="font-link">Register the account</h1>
      <div>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
          }}
        >
          <FormControl sx={{ m: 1 }} color="secondary">
            <InputLabel htmlFor="my-input1">First Name</InputLabel>
            <Input
              required
              type="text"
              id="my-input1"
              {...register("firstname")}
              aria-describedby="my-helper-text"
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              We may share your first name.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1 }} color="secondary">
            <InputLabel htmlFor="my-input2">Email address</InputLabel>
            <Input
              required
              type="email"
              id="my-input2"
              aria-describedby="my-helper-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1 }} color="secondary">
            <InputLabel htmlFor="myInput3">Password</InputLabel>
            <Input
              required
              type="password"
              id="myinput3"
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
            type="submit"
            variant="outlined"
            sx={{ p: 1 }}
          >
            Register
          </Button>
        </form>
        <NavLink to={"/login"} className="link">
          Login into account
        </NavLink>
      </div>
      <Footer></Footer>
    </Box>
  );
};

export default Register;
