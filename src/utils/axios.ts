import axios from "axios";

export const instanceStore = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
