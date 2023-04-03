import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSetRecoilState } from "recoil";
import { adminModalState, selectContentState, adminState, adminName } from "../atom/atom";
import useGetAdmin from "../hooks/useGetAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AdminModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onBlur" });

  // setRecoilState
  const setAdminModal = useSetRecoilState(adminModalState);
  const setSelectContent = useSetRecoilState(selectContentState);
  const setAdminState = useSetRecoilState(adminState);
  const setAdminName = useSetRecoilState(adminName);

  const { mutate, isSuccess } = useGetAdmin();

  const onSubmit = (data) => {
    mutate(data);
  };

  const onError = () => {
    console.log("failed");
  };

  const handleClickCancel = () => {
    setAdminModal(false);
    setSelectContent(0);
  };

  useEffect(() => {
    if (isSuccess) {
      setAdminState(true);
      setAdminModal(false);
      setAdminName(watch("name"));
      toast.success("인증되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <ToastContainer />
      <div className="tablet:w-4/5 w-full h-fit flex flex-col justify-center items-center px-6">
        <div className="w-fit h-fit tablet:text-xl text-lg text-textColor/70 font-semibold">
          관리자 인증
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full h-full">
          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit tablet:text-base text-sm text-textColor/70 font-semibold">
              이름
            </div>
          </div>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="w-full h-fit bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            {...register("name", {
              required: "이름이 입력되지 않았습니다",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => {
              return (
                <div className="w-full h-fit flex flex-row justify-end items-center text-xs font-NMSNeo2 text-negativeColor mt-2">
                  {message}
                </div>
              );
            }}
          />

          <div className="w-full h-full flex flex-row justify-start items-end mt-7">
            <div className="w-fit h-fit tablet:text-base text-sm text-textColor/70 font-semibold">
              관리자 코드
            </div>
          </div>
          <input
            type="password"
            placeholder="관리자코드를 입력하세요"
            className="w-full h-fit bg-grayColor rounded-md outline-none p-2 mt-2 text-textColor/80"
            {...register("code", {
              required: "관리자코드가 입력되지 않았습니다",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="code"
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
        {/* information */}
        <div className="w-full h-fit flex flex-col justify-center items-center mt-14">
          <div className="w-full h-fit flex flex-row justify-center items-center text-sm text-pointColor">
            관리자 등록 요청은 아래 번호로 연락주세요
          </div>
          <div className="w-full h-fit flex flex-row justify-center items-center text-xs text-textColor mt-1">
            010-4601-9075 (서비스 담당자)
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
