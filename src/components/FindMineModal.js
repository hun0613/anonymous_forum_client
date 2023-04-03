import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSetRecoilState } from "recoil";
import { findMineModalState, selectEmailState, modalControlBoardIdState } from "../atom/atom";
import useGetMyBoard from "../hooks/useGetMyBoard";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FindMineModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // setRecoilState
  const setGlobalEmail = useSetRecoilState(selectEmailState);
  const activeFindMineModal = useSetRecoilState(findMineModalState);
  const setBoardId = useSetRecoilState(modalControlBoardIdState);

  // useState
  const [email, setEmail] = useState("");

  // react-query
  const { refetch, isFetching, isError } = useGetMyBoard(email);

  const onSubmit = (data) => {
    setGlobalEmail(email);
    refetch();
  };

  const onFail = () => {
    console.log("error");
  };

  const handleClickCancel = () => {
    activeFindMineModal(false);
    setBoardId(0);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      toast.error("등록되지 않은 이메일입니다.", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isError]);

  return (
    <>
      {!isFetching ? null : (
        <div className="fixed top-0 left-0 w-full h-full flex flex-row justify-center items-center bg-grayColor/50">
          <PulseLoader color="#3446F0" />
        </div>
      )}

      <div className="tablet:w-4/5 w-full h-fit flex flex-col justify-center items-center px-6">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          사용자 인증
        </div>
        <div className="w-fit h-fit tablet:text-sm text-xs text-pointColor mt-2">
          게시글 작성 시 입력했던 이메일을 입력해주세요
        </div>
        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit, onFail)}>
          {/* email input */}
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit text-lg text-textColor/70 font-semibold">이메일</div>
          </div>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            className="w-full h-fit bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            {...register("email", {
              required: "이메일이 입력되지 않았습니다",
              onChange: handleChangeEmail,
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: "이메일 형식이 아닙니다",
              },
            })}
          ></input>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-2">
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
              인증하기
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

export default FindMineModal;
