import axios from "axios";

const getAdmin = (data) => {
  return axios.post("/admin", data, {
    // baseURL: "http://localhost:8080",
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default getAdmin;
