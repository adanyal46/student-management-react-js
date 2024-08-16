// src/stores/authStore.js
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; // Replace with your own secret key for encryption

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const useAuthStore = create((set, get) => ({
  token: Cookies.get("token") ? decryptData(Cookies.get("token")) : null,
  user: Cookies.get("user") ? decryptData(Cookies.get("user")) : null,
  isAuthenticated: !!Cookies.get("token"),
  login: (token) => {
    const decodedToken = jwtDecode(token);
    Cookies.set("token", encryptData(token), { expires: 1 / 24 });
    Cookies.set("user", encryptData(decodedToken), { expires: 1 / 24 });
    set({ token, isAuthenticated: true, user: decodedToken });
  },
  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user");
    set({ token: null, isAuthenticated: false, user: null });
  },
  isTokenExpired: () => {
    if (!get().token) return true;
    const decodedToken = jwtDecode(get().token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
  },
}));

export default useAuthStore;
