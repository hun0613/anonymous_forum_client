import axios from "axios";

const deleteBoard = (boardId) => {
  return axios.delete(`/board?boardId=${boardId}`, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default deleteBoard;
