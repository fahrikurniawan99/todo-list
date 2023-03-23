import axios from "axios";
import config from "../config";

const makeRequest = axios.create({ baseURL: config.baseUrl });

export default makeRequest;
