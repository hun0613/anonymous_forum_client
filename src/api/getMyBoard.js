import axios from "axios";

const getMyBoard = (email) => {
  return axios.get(`/board?email=${email}`, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default getMyBoard;
