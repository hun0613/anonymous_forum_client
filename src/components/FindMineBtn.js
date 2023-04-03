import { useSetRecoilState } from "recoil";
import { findMineModalState, boardSettingModalState } from "../atom/atom";

const FindMineBtn = () => {
  const activeFindMineModal = useSetRecoilState(findMineModalState);
  const setBoardSettingModal = useSetRecoilState(boardSettingModalState);

  const handleClickFindBtn = () => {
    activeFindMineModal(true);
    setBoardSettingModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="w-fit h-fit tablet:px-10 px-7 py-2 bg-pointColor hover:bg-pointColor/70 rounded-md text-white tablet:text-base text-sm font-NMSNeo2"
        onClick={handleClickFindBtn}
      >
        내 게시글 찾기
      </button>
    </>
  );
};

export default FindMineBtn;
