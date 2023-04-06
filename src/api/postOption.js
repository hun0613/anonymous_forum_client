import axios from "axios";

const postOption = (data) => {
  return axios.post("/option", data, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default postOption;
