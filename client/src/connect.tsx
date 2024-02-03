import axios from "axios";

const connector = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default connector;
