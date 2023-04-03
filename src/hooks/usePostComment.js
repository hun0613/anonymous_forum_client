import { useMutation, useQueryClient } from "@tanstack/react-query";
import postComment from "../api/postComment";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  commentModalState,
  userState,
  myBoardRefetchTrigger,
  selectContentState,
  selectCommentRefIdState,
  selectCommentDepthState,
} from "../atom/atom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usePostComment = () => {
  const queryClient = useQueryClient();

  // setRecoilState
  const setCommentModal = useSetRecoilState(commentModalState);
  const setSelectBoardId = useSetRecoilState(selectContentState);
  const setSelectCommentDepth = useSetRecoilState(selectCommentDepthState);
  const setSelectCommentRefId = useSetRecoilState(selectCommentRefIdState);

  // recoilValue
  const user = useRecoilValue(userState);

  // useRecoilState
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger);

  return useMutation(postComment, {
    onSuccess: (res) => {
      setCommentModal(false);
      setSelectBoardId(0);
      setSelectCommentDepth(0);
      setSelectCommentRefId(0);

      if (user) {
        setTrigger(!trigger);
      } else {
        queryClient.invalidateQueries(["board"]);
      }
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

export default usePostComment;
