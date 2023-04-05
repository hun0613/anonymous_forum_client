import axios from "axios";

const getAdmin = (data) => {
  return axios.post("/admin", data, {
    // baseURL: "http://localhost:8080",
    baseURL: "http://192.168.20.65:8080",
  });
};

export default getAdmin;
