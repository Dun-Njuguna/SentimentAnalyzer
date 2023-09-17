import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3003", // Replace with your base URL
  timeout: 10000, // Adjust the timeout as needed
  withCredentials: true,
});

export default instance;
