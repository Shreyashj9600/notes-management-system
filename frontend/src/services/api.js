import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://notes-management-system-maoxy77gl-shreyashj9600s-projects.vercel.app/",
});

export default API;