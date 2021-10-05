import axios from "axios";

const baseUrl = process.env.API_URL;
axios.defaults.baseURL = baseUrl;
