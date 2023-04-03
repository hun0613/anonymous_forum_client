import { useRecoilValue } from "recoil";
import { selectContentState } from "../atom/atom";
import useDeleteBoard from "../hooks/useDeleteBoard";

const AdminMemu = () => {
  const selectContent = useRecoilValue(selectContentState);
  const { mutate } = useDeleteBoard();

  const handleClickDelete = () => {
    mutate(selectContent);
  };

  return (
    <>
      <div className="tablet:w-4/5 w-full h-full flex flex-col justify-center items-center px-6">
        <div className="w-fit h-full tablet:text-xl text-lg text-textColor/70 font-semibold">
          게시글 설정
        </div>
        <div className="w-full h-fit flex tablet:flex-row flex-col justify-center items-center mt-10">
          <button
            type="button"
            className="w-fit h-fit flex flex-row justify-center items-center bg-cancelBtnColor hover:bg-cancelBtnColor/60 text-textColor px-10 py-3 rounded-md tablet:mr-10 tablet:mb-0 mb-5"
          >
            수정하기
          </button>
          <button
            type="button"
            className="w-fit h-fit flex tablet:flex-col flex-row justify-center items-center bg-negativeColor/80 hover:bg-negativeColor/60 text-white px-10 py-3 rounded-md"
            onClick={handleClickDelete}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminMemu;
