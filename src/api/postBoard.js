import axios from "axios";

const postBoard = ({ title, content, email }) => {
  const body = {
    title: title,
    content: content,
    email: email,
  };
  return axios.post(`/board`, body, {
    // baseURL: "http://localhost:8080",
    baseURL: "http://192.168.20.65:8080",
  });
};

export default postBoard;
