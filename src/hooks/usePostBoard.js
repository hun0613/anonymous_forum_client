import { useMutation, useQueryClient } from "@tanstack/react-query";
import postBoard from "../api/postBoard";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  createModalState,
  userState,
  myBoardRefetchTrigger,
} from "../atom/atom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usePostBoard = () => {
  const setModalState = useSetRecoilState(createModalState);
  const user = useRecoilValue(userState);
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger);
  const queryClient = useQueryClient();

  return useMutation(postBoard, {
    onSuccess: (res) => {
      if (user) {
        setTrigger(!trigger);
      } else {
        queryClient.invalidateQueries(["board"]);
      }

      setModalState(false);
      toast.success("등록되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default usePostBoard;
