import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  defaultTitleState,
  defaultContentState,
  updateModalState,
  selectContentState,
  modalControlBoardIdState,
} from "../atom/atom";
import useCalculateByte from "../hooks/useCalculateByte";
import useUpdateBoard from "../hooks/useUpdateBoard";

const UpdateModal = () => {
  // recoilValue
  const defaultTitle = useRecoilValue(defaultTitleState);
  const defaultContent = useRecoilValue(defaultContentState);

  // setRecoilState
  const setUpdateModal = useSetRecoilState(updateModalState);
  const setBoardId = useSetRecoilState(modalControlBoardIdState);

  // recoilState
  const [selectContent, setSelectContent] = useRecoilState(selectContentState);

  // useState
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [totalTitleByte, setTotalTitleByte] = useState(useCalculateByte(defaultTitle));
  const [totalContentByte, setTotalContentByte] = useState(useCalculateByte(defaultContent));
  const [titleCheck, setTitleCheck] = useState(true);
  const [contentCheck, setContentCheck] = useState(true);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // react-query
  const { mutate } = useUpdateBoard();

  // submit 함수
  const onSubmit = () => {
    const data = {
      boardId: selectContent,
      title: title,
      content: content,
    };

    mutate(data);
  };

  // submit 실패시 함수
  const onFail = () => {};

  // 취소btn 함수
  const handleClickCancel = () => {
    setUpdateModal(false);
    setSelectContent(0);
    setBoardId(0);
  };

  // title onchange 함수
  const handleChangeTitle = (e) => {
    let byte = 0;

    if (e.target.value.length < 41) {
      // input value값의 각 문자에 대한 한글여부를 판단하여 해당하는 byte값 plus
      for (let i = 0; i < e.target.value.length; i++) {
        if (e.target.value[i].charCodeAt() > 128) {
          byte += 3;
        } else {
          byte += 1;
        }
      }
      setTotalTitleByte(byte);
      setTitle(e.target.value);

      // 40자 초과일 경우를 판별하는 상태
      setTitleCheck(true);
    } else {
      // 40자 초과일 경우를 판별하는 상태
      setTitleCheck(false);
    }
  };

  // content onchange 함수
  const handleChangeContent = (e) => {
    let byte = 0;

    if (e.target.value.length < 201) {
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

      // 200자 초과일 경우를 판별하는 상태
      setContentCheck(true);
    } else {
      // 200자 초과일 경우를 판별하는 상태
      setContentCheck(false);
    }
  };
  return (
    <>
      <div className="tablet:w-4/5 w-full h-fit flex flex-col justify-center items-center px-6">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          게시글 수정
        </div>

        {/* title input */}
        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit, onFail)}>
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit text-lg text-textColor/70 font-semibold">제목</div>
            {/* 40자 이하일 경우, pointColor, 그렇지 않으면 negativeColor */}
            {titleCheck ? (
              <div className="w-fit h-fit text-xs text-pointColor ml-1 pb-0.5">
                {`(${title.length}/40자) ${totalTitleByte}byte`}
              </div>
            ) : (
              <div className="w-fit h-fit text-xs text-negativeColor ml-1 pb-0.5">
                {`(${title.length}/40자) ${totalTitleByte}byte`}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full h-fit bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            value={title}
            {...register("title", {
              required: "제목이 입력되지 않았습니다",
              onChange: handleChangeTitle,
            })}
          ></input>
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-2">
                  {message}
                </div>
              );
            }}
          />
          {/* content input */}
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit text-lg text-textColor/70 font-semibold">본문</div>
            {contentCheck ? (
              <div className="w-fit h-fit text-xs text-pointColor ml-1 pb-0.5">
                {`(${content.length}/200자) ${totalContentByte}byte`}
              </div>
            ) : (
              <div className="w-fit h-fit text-xs text-negativeColor ml-1 pb-0.5">
                {`(${content.length}/200자) ${totalContentByte}byte`}
              </div>
            )}
          </div>
          <textarea
            placeholder="본문을 입력하세요"
            className="w-full h-[100px] resize-none bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            value={content}
            {...register("content", {
              required: "본문이 입력되지 않았습니다",
              onChange: handleChangeContent,
            })}
          ></textarea>
          <ErrorMessage
            errors={errors}
            name="content"
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

export default UpdateModal;
