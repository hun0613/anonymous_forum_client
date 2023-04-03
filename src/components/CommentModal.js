import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  commentModalState,
  modalControlBoardIdState,
  selectContentState,
  selectCommentDepthState,
  selectCommentRefIdState,
  adminName,
} from "../atom/atom";
import { useState } from "react";
import usePostComment from "../hooks/usePostComment";

const CommentModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // setRecoilState
  const activeCommentModal = useSetRecoilState(commentModalState);
  const setBoardId = useSetRecoilState(modalControlBoardIdState);

  // useRecoilState
  const [selectBoardId, setSelectBoardId] = useRecoilState(selectContentState);
  const [selectCommentDepth, setSelectCommentDepth] = useRecoilState(selectCommentDepthState);
  const [selectCommentRefId, setSelectCommentRefId] = useRecoilState(selectCommentRefIdState);

  // recoilValue
  const adminNameValue = useRecoilValue(adminName);

  // useState
  const [comment, setComment] = useState("");
  const [totalCommentByte, setTotalCommentByte] = useState(0);
  const [commentCheck, setCommentCheck] = useState(true);

  // react-query
  const { mutate } = usePostComment();

  const onSubmit = (data) => {
    const body = {
      "bundleId": selectBoardId,
      "depth": selectCommentDepth,
      "refId": selectCommentRefId,
      "content": data.comment,
      "admin": adminNameValue,
    };
    mutate(body);
  };

  const onFail = () => {};

  // input change 호출함수
  const handleChangeComment = (e) => {
    let byte = 0;

    if (e.target.value.length < 101) {
      for (let i = 0; i < e.target.value.length; i++) {
        if (e.target.value[i].charCodeAt() > 128) {
          byte += 3;
        } else {
          byte += 1;
        }
      }
      setTotalCommentByte(byte);
      setComment(e.target.value);

      setCommentCheck(true);
    } else {
      setCommentCheck(false);
    }
  };

  // 취소버튼 클릭이벤트
  const handleClickCancel = () => {
    activeCommentModal(false);
    setBoardId(0);
    setSelectCommentDepth(0);
    setSelectCommentRefId(0);
    setSelectBoardId(0);
  };

  return (
    <>
      <div className="tablet:w-4/5 w-full h-fit flex flex-col justify-center items-center px-6">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          댓글 달기
        </div>

        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit, onFail)}>
          {/* comment input */}
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit text-lg text-textColor/70 font-semibold">댓글</div>

            {commentCheck ? (
              <div className="w-fit h-fit text-xs text-pointColor ml-1 pb-0.5">
                {`(${comment.length}/100자) ${totalCommentByte}byte`}
              </div>
            ) : (
              <div className="w-fit h-fit text-xs text-negativeColor ml-1 pb-0.5">
                {`(${comment.length}/100자) ${totalCommentByte}byte`}
              </div>
            )}
          </div>
          <textarea
            placeholder="댓글을 입력하세요"
            className="w-full h-[100px] resize-none bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            value={comment}
            {...register("comment", {
              required: "댓글이 입력되지 않았습니다",
              onChange: handleChangeComment,
            })}
          ></textarea>
          <ErrorMessage
            errors={errors}
            name="comment"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-1">
                  {message}
                </div>
              );
            }}
          />

          {/* btn */}
          <div className="w-full h-fit flex tablet:flex-row flex-col justify-center items-center mt-12">
            <button
              type="submit"
              className="w-fit h-fit flex flex-col justify-center items-center bg-pointColor hover:bg-pointColor/60 text-white px-10 py-3 rounded-md"
              onClick={handleSubmit}
            >
              등록하기
            </button>
            <button
              type="button"
              className="w-fit h-fit flex flex-col justify-center items-center bg-cancelBtnColor hover:bg-cancelBtnColor/60 text-textColor/70 px-10 py-3 rounded-md tablet:ml-10 tablet:mt-0 mt-4"
              onClick={handleClickCancel}
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentModal;
