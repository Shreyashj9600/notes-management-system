import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-management-system-nine.vercel.app/api",

});

export default API;