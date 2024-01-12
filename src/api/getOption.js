import axios from "axios";

const getOption = () => {
  return axios.get("/option", {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default getOption;
