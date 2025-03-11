import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = process.env.REACT_APP_COOKIE_PREFIX || "easy_solution";

const initialState = {
    user: null,
    token: Cookies.get(TOKEN_KEY) || null,
}; 

const AuthSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            Cookies.set(TOKEN_KEY, action.payload.token, { expires: 7 });
            state.user = jwtDecode(action.payload.token);
        },
        logout(state) {
            state.token = null;
            state.user = null;
            Cookies.remove(TOKEN_KEY);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
 