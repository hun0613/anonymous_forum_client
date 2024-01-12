import axios from "axios";

const getBoard = () => {
  return axios.get("/board", {
    // baseURL: "http://localhost:8080",
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default getBoard;
