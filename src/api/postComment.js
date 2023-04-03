import axios from "axios";

const postComment = (data) => {
  return axios.post("/comment", data, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default postComment;
