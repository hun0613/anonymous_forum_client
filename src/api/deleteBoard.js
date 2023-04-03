import axios from "axios";

const deleteBoard = (boardId) => {
  return axios.delete(`/board?boardId=${boardId}`, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default deleteBoard;
