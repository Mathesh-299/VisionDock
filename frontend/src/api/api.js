import axios from "axios";

const API = axios.create({
    baseURL: "https://visiondock.onrender.com/api",
});

export default API;
