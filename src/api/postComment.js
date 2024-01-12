import axios from "axios";

const postComment = (data) => {
  return axios.post("/comment", data, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default postComment;
