import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { User, UserReducer } from "../../types/Users";

const initialState: UserReducer = {
  users: [],
  currentUser: undefined,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/users");
  return response.data;
});

export const authenticate = createAsyncThunk(
  "authenticate",
  async (token: string) => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = undefined;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (build) => {
    build
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
        }
      )
      .addCase(authenticate.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logOut } = userSlice.actions;
