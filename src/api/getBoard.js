import axios from "axios";

const getBoard = () => {
  return axios.get("/board", {
    // baseURL: "http://localhost:8080",
    baseURL: "http://192.168.20.65:8080",
  });
};

export default getBoard;
