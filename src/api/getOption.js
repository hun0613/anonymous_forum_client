import axios from "axios";

const getOption = () => {
  return axios.get("/option", {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default getOption;
