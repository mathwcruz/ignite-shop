import axios from "axios";

export const api = axios.create({
  baseURL: 'https://ignite-shop-mathwcruz.vercel.app/api/'
})