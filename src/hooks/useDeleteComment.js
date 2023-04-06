import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteComment from "../api/deleteComment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { myBoardRefetchTrigger, userState } from "../atom/atom";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  // recoilValue
  const user = useRecoilValue(userState);

  // useRecoilState
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger);

  return useMutation(deleteComment, {
    onSuccess: (res) => {
      if (user) {
        setTrigger(!trigger);
      } else {
        queryClient.invalidateQueries(["board"]);
      }

      toast.success("삭제되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useDeleteComment;
