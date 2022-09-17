import axios from "axios";
import { MockAPI } from "../constants/apiKeys";

export const api = axios.create({
  baseURL: `https://${MockAPI}.mockapi.io/todos/` 
});

