import axios from "axios";

const patchComment = (data) => {
    return axios.patch("/comment", data, {
        baseURL: "http://192.168.20.65:8080",
    })
}

export default patchComment;