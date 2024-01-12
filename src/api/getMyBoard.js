import axios from "axios";

const getMyBoard = (email) => {
  return axios.get(`/board?email=${email}`, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default getMyBoard;
