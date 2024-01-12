import axios from "axios";

const postBoard = ({ title, content, email }) => {
  const body = {
    title: title,
    content: content,
    email: email,
  };
  return axios.post(`/board`, body, {
    // baseURL: "http://localhost:8080",
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default postBoard;
