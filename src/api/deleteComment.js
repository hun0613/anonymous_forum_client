import axios from "axios";

const deleteComment = (commentId) => {
  return axios.delete(`/comment?commentId=${commentId}`, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default deleteComment;
