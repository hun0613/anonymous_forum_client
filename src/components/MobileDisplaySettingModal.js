import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import usePostOption from "../hooks/usePostOption";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  adminName,
  pageAmountState,
  pageSetAmountState,
  displaySettingModalState,
} from "../atom/atom";

const MobileDisplaySettingModal = () => {
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
      <div className="tablet:w-[85%] w-full h-fit flex flex-col justify-start items-center">
        <div className="w-fit h-fit tablet:text-xl text-xl text-textColor/70 font-semibold">
          디스플레이 설정
        </div>
        <form
          className="w-full h-full flex flex-col justify-start items-center"
          onSubmit={handleSubmit(onSubmit, onFail)}
        >
          <div className="w-[85%] h-fit flex flex-col justify-start items-center mt-10 bg-white drop-shadow-lg py-6 px-3 rounded-md">
            <div className="w-full h-fit flex flex-row justify-center items-center text-md font-NMSNeo3 text-textColor">
              페이지 당 게시글 수
            </div>
            <div className="w-full h-fit flex flex-row justify-center items-center text-xs font-NMSNeo3 text-pointColor/50 mt-2">
              한 페이지에 표시되는 게시글 수를 설정합니다
            </div>
            <input
              type="number"
              className="w-[50%] h-full outline-0.5 outline-pointColor/30 text-center py-2 border border-textColor/20 rounded-md mt-6"
              min="1"
              defaultValue={pageAmount}
              {...register("pageAmount", {
                required: "값이 입력되지 않았습니다",
                valueAsNumber: true,
                min: 1,
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="pageAmount"
              render={({ message }) => {
                return (
                  <div className="w-full h-fit flex flex-row justify-center items-center text-xs font-NMSNeo2 text-negativeColor mt-3">
                    {message}
                  </div>
                );
              }}
            />
          </div>

          <div className="w-[85%] h-fit flex flex-col justify-start items-center mt-10 bg-white drop-shadow-lg py-10 px-3 rounded-md">
            <div className="w-full h-fit flex flex-row justify-center items-center text-md font-NMSNeo3 text-textColor">
              페이지 버튼 수
            </div>
            <div className="w-full h-fit flex flex-row justify-center items-center text-xs font-NMSNeo3 text-pointColor/50 mt-2">
              게시판 하단에 보이는 페이지 버튼 수를 설정합니다
            </div>
            <div className="w-full h-fit flex flex-row justify-center items-center text-xs font-NMSNeo3 text-pointColor/70 mt-2">
              (데스크탑 버전에만 적용됩니다!)
            </div>
            <input
              type="number"
              className="w-[50%] h-full outline-0.5 outline-pointColor/30 text-center py-2 border border-textColor/20 rounded-md mt-6"
              min="1"
              defaultValue={pageSetAmount}
              {...register("pageSetAmount", {
                required: "값이 입력되지 않았습니다",
                valueAsNumber: true,
                min: 1,
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="pageSetAmount"
              render={({ message }) => {
                return (
                  <div className="w-full h-fit flex flex-row justify-center items-center text-xs font-NMSNeo2 text-negativeColor mt-3">
                    {message}
                  </div>
                );
              }}
            />
          </div>

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

export default MobileDisplaySettingModal;
