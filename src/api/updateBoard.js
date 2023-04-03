import axios from "axios";

const updateBoard = (data) => {
    return axios.patch("/board", data, {
        baseURL: "http://192.168.20.65:8080",
    })
}

export default updateBoard;