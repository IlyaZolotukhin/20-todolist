import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "cfe2881d-c17b-4a41-8a8a-f9d95878b4cc",
  },
});
