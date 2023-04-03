import { useMutation } from "@tanstack/react-query";
import deleteBoard from "../api/deleteBoard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDeleteBoard = () => {
  return useMutation(deleteBoard, {
    onError: (err) => {
      toast.error("서버상태를 확인하세요", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
};

export default useDeleteBoard;
