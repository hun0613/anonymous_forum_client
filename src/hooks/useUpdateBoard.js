import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateBoard from "../api/updateBoard";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  updateModalState,
  selectContentState,
  myBoardRefetchTrigger,
  userState,
} from "../atom/atom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  // setRecoilState
  const setUpdateModal = useSetRecoilState(updateModalState);
  const setSelectContent = useSetRecoilState(selectContentState);

  // recoilState
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger);

  // recoilValue
  const user = useRecoilValue(userState);

  return useMutation(updateBoard, {
    onSuccess: (res) => {
      setUpdateModal(false);
      setSelectContent(0);

      if (user) {
        setTrigger(!trigger);
      } else {
        queryClient.invalidateQueries(["board"]);
      }

      toast.success("수정되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useUpdateBoard;
