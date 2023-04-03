import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import patchComment from "../api/patchComment";
import { myBoardRefetchTrigger, userState, selectCommentRefIdState, updateCommentModalState } from "../atom/atom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usePatchComment = () => {
  const queryClient = useQueryClient();

  // setRecoilState
  const setUpdateCommentModal = useSetRecoilState(updateCommentModalState);
  const setSelectCommentId = useSetRecoilState(selectCommentRefIdState);

  // recoilValue
  const user = useRecoilValue(userState);

  // useRecoilState
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger);

  return useMutation(patchComment, {
    onSuccess: (res) => {
      setUpdateCommentModal(false);
      setSelectCommentId(0);
      
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

export default usePatchComment;
