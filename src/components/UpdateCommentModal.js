import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  defaultCommentContentState,
  updateCommentModalState,
  selectCommentRefIdState,
} from "../atom/atom";
import useCalculateByte from "../hooks/useCalculateByte";
import usePatchComment from "../hooks/usePatchComment";

const UpdateCommentModal = () => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // useRecoilState
  const [commentContent, setCommentContent] = useRecoilState(defaultCommentContentState);
  const [selectCommentId, setSelectCommentId] = useRecoilState(selectCommentRefIdState);

  // useState
  const [content, setContent] = useState(commentContent);
  const [totalContentByte, setTotalContentByte] = useState(useCalculateByte(content));
  const [contentCheck, setContentCheck] = useState(true);

  // setRecoilState
  const setCommentModal = useSetRecoilState(updateCommentModalState);

  // react-query
  const { mutate } = usePatchComment();

  const onSubmit = () => {
    const data = {
      commentId: selectCommentId,
      comment: content,
    };

    mutate(data);
  };

  const onFail = () => {};

  const handleClickCancel = () => {
    setCommentModal(false);
    setCommentContent("");
    setSelectCommentId(0);
  };

  const handleChangeContent = (e) => {
    let byte = 0;

    if (e.target.value.length < 101) {
      // input value값의 각 문자에 대한 한글여부를 판단하여 해당하는 byte값 plus
      for (let i = 0; i < e.target.value.length; i++) {
        if (e.target.value[i].charCodeAt() > 128) {
          byte += 3;
        } else {
          byte += 1;
        }
      }
      setTotalContentByte(byte);
      setContent(e.target.value);

      // 100자 초과일 경우를 판별하는 상태
      setContentCheck(true);
    } else {
      // 100자 초과일 경우를 판별하는 상태
      setContentCheck(false);
    }
  };

  return (
    <>
      <div className="tablet:w-4/5 w-full h-fit flex flex-col justify-center items-center px-6">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          댓글 수정
        </div>
        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit, onFail)}>
          {/* content input */}
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit text-lg text-textColor/70 font-semibold">댓글</div>
            {contentCheck ? (
              <div className="w-fit h-fit text-xs text-pointColor ml-1 pb-0.5">
                {`(${content.length}/100자) ${totalContentByte}byte`}
              </div>
            ) : (
              <div className="w-fit h-fit text-xs text-negativeColor ml-1 pb-0.5">
                {`(${content.length}/100자) ${totalContentByte}byte`}
              </div>
            )}
          </div>
          <textarea
            placeholder="본문을 입력하세요"
            className="w-full h-[100px] resize-none bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            value={content}
            {...register("comment", {
              required: "본문이 입력되지 않았습니다",
              onChange: handleChangeContent,
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
              수정하기
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

export default UpdateCommentModal;
