import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "672a3475-5358-46e1-b5c9-5ccc4db7abe6",
  },
});
