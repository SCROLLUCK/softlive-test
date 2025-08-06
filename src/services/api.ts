import environment from "@/utils/environment";
import axios from "axios";

export const api = axios.create({
  baseURL: environment.VITE_API_URL,
});
