import axios from "axios";

const updateBoard = (data) => {
  return axios.patch("/board", data, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default updateBoard;
