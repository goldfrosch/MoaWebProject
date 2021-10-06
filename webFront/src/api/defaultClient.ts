import axios from "axios";
import "dotenv/config";

const baseURL: string = process.env.REACT_APP_BASE_URL ?? "";

const defaultClient = axios.create({
  baseURL,
});

export default defaultClient;
