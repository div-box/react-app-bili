import axios from "axios";
import moment from "moment";
const instance = axios.create({
  // baseURL: "/api/",
  timeout: 5000,
});
instance.interceptors.request.use((config) => {
  config.params = { ...config.params, t: Number(moment().format("x")) };
  return config;
  // options.params.t = Number(moment().format("x"))
  // return options
});

export default instance;
