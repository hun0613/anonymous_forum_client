import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  adminName,
  pageAmountState,
  pageSetAmountState,
  displaySettingModalState,
} from "../atom/atom";
import usePostOption from "../hooks/usePostOption";

const DisplaySettingModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  // react-query
  const { mutate } = usePostOption();

  // recoilValue
  const pageAmount = useRecoilValue(pageAmountState);
  const pageSetAmount = useRecoilValue(pageSetAmountState);
  const adminNameValue = useRecoilValue(adminName);

  // setRecoilState
  const setDisplaySettingModal = useSetRecoilState(displaySettingModalState);

  const onSubmit = (data) => {
    data["adminName"] = adminNameValue;
    mutate(data);
  };

  const onFail = () => {
    console.log("fail");
  };

  const handleClickCancel = () => {
    setDisplaySettingModal(false);
  };

  return (
    <>
      <div className="tablet:w-[85%] w-full h-fit flex flex-col justify-center items-center">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          디스플레이 설정
        </div>
        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit, onFail)}>
          {/* setting titles (header) */}
          <div className="w-full h-fit flex flex-row justify-between items-center mt-10 px-3">
            <div className="w-1/5 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor/70">
              Setting Name
            </div>
            <div className="w-3/6 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor/70">
              Description
            </div>
            <div className="w-1/6 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor/70">
              Value
            </div>
          </div>

          {/* 페이지 당 게시글 수 setting목록 */}
          <div className="w-full h-fit flex flex-row justify-between items-center mt-4 bg-white drop-shadow-lg py-2 px-3 rounded-md">
            <div className="w-1/5 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo3 text-textColor">
              페이지 당 게시글 수
            </div>
            <div className="w-3/6 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor">
              한 페이지에 표시되는 게시글 수를 설정합니다
            </div>
            <div className="w-1/6 h-full flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor">
              <input
                type="number"
                className="w-[70%] h-full outline-0.5 outline-pointColor/30 text-center py-2 border border-textColor/20 rounded-md"
                min="1"
                defaultValue={pageAmount}
                {...register("pageAmount", {
                  required: "값이 입력되지 않았습니다",
                  valueAsNumber: true,
                  min: 1,
                })}
              ></input>
            </div>
          </div>

          <ErrorMessage
            errors={errors}
            name="pageAmount"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-3">
                  {message}
                </div>
              );
            }}
          />

          {/* 페이지 버튼 수 setting목록 */}
          <div className="w-full h-fit flex flex-row justify-between items-center mt-4 bg-white drop-shadow-lg py-2 px-3 rounded-md">
            <div className="w-1/5 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo3 text-textColor">
              페이지 버튼 수
            </div>
            <div className="w-3/6 h-fit flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor">
              게시판 하단에 보이는 페이지 버튼 수를 설정합니다
            </div>
            <div className="w-1/6 h-full flex flex-row justify-center items-center text-sm font-NMSNeo2 text-textColor">
              <input
                type="number"
                className="w-[70%] h-full outline-0.5 outline-pointColor/30 text-center py-2 border border-textColor/20 rounded-md"
                min="1"
                defaultValue={pageSetAmount}
                {...register("pageSetAmount", {
                  required: "값이 입력되지 않았습니다",
                  valueAsNumber: true,
                  min: 1,
                })}
              ></input>
            </div>
          </div>

          <ErrorMessage
            errors={errors}
            name="pageSetAmount"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-3">
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
            >
              적용하기
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

export default DisplaySettingModal;
