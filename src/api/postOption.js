import axios from "axios";

const postOption = (data) => {
  return axios.post("/option", data, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default postOption;
