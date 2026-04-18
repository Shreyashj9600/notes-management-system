import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-management-system-maoxy77gl-shreyashj9600s-projects.vercel.app/api/notes",
});

export default API;