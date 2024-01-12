import axios from "axios";

const patchComment = (data) => {
  return axios.patch("/comment", data, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default patchComment;
