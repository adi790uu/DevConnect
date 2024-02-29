import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const connector = axios.create({
  baseURL: "http://localhost:8000/api",
});

const connector2 = axios.create({
  baseURL: "https://co-compiler-backend.onrender.com/api/v1",
});

export default connector;
