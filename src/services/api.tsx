
import axios from "axios";

// jason-server --watch db.json
export const api = axios.create({
  baseURL: "http://localhost:3000",
});