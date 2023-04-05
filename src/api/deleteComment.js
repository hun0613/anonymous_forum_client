import axios from "axios";

const deleteComment = (commentId) => {
  return axios.delete(`/comment?commentId=${commentId}`, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default deleteComment;