import { useMutation } from "@tanstack/react-query";
import getAdmin from "../api/getAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useGetAdmin = () => {

  return useMutation(getAdmin, {
    onError: (err) => {
      setTimeout(() => {
        toast.error("등록되지 않은 관리자정보입니다", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }, 400);
    },
  });
};

export default useGetAdmin;
