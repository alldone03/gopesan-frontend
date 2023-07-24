import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { AuthData } from "../../store/models/authdata";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isNavbarOpen: false as boolean,
    istoggleProfileNavbar: false as boolean,
  },
  reducers: {
    toggleNavbar: (state) => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
    toggleProfileNavbar: (state) => {
      state.istoggleProfileNavbar = !state.istoggleProfileNavbar;
    },
    toggleNavbarLogout: () => {
      const userData: AuthData = JSON.parse(
        sessionStorage.getItem("authdata") as string
      );
      const token = userData.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const bodyParameters = {
        key: "value",
      };
      axios
        .post(
          import.meta.env.VITE_API_URL + "/auth/logout",
          bodyParameters,
          config
        )
        .then(() => {
          sessionStorage.removeItem("authdata");
          window.location.href = "/login";
        })
        .catch((err) => {
          if (err.response.status == 401) {
            sessionStorage.removeItem("authdata");
            window.location.href = "/login";
          }
        });
    },
  },
});

export const { toggleNavbar, toggleProfileNavbar, toggleNavbarLogout } =
  navbarSlice.actions;
export default navbarSlice.reducer;
