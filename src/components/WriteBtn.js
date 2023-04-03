import { useSetRecoilState } from "recoil";
import { createModalState, boardSettingModalState } from "../atom/atom";

const WriteBtn = () => {
  const setModalState = useSetRecoilState(createModalState);
  const setBoardSettingModal = useSetRecoilState(boardSettingModalState);

  const handleClickWrite = () => {
    setModalState(true);
    setBoardSettingModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="w-fit h-fit tablet:px-10 px-7 py-2 bg-pointColor hover:bg-pointColor/70 rounded-md text-white tablet:text-base text-sm font-NMSNeo2 mr-3 "
        onClick={handleClickWrite}
      >
        글 작성하기
      </button>
    </>
  );
};

export default WriteBtn;
