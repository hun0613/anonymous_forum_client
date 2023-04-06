import { useSetRecoilState } from "recoil";
import {
  createModalState,
  adminModalState,
  selectContentState,
  commentModalState,
  findMineModalState,
  modalControlBoardIdState,
  updateCommentModalState,
  updateModalState,
  defaultCommentContentState,
  commentSettingCommentId,
  displaySettingModalState,
} from "../../atom/atom";

const ModalContainer = ({ children }) => {
  // setRecoilState
  const setCreateModalState = useSetRecoilState(createModalState);
  const setAdminModalState = useSetRecoilState(adminModalState);
  const setSelectContent = useSetRecoilState(selectContentState);
  const setCommentModalState = useSetRecoilState(commentModalState);
  const setFindMineModalState = useSetRecoilState(findMineModalState);
  const setBoardId = useSetRecoilState(modalControlBoardIdState);
  const setUpdateCommentModal = useSetRecoilState(updateCommentModalState);
  const setUpdateModal = useSetRecoilState(updateModalState);
  const setCommentState = useSetRecoilState(defaultCommentContentState);
  const setCommentId = useSetRecoilState(commentSettingCommentId);
  const setDisplaySettingModal = useSetRecoilState(displaySettingModalState);

  const handleClickBackground = (e) => {
    // 게시글 작성 모달 비활성화
    setCreateModalState(false);
    // 관리자 인증 모달 비활성화
    setAdminModalState(false);
    // 선택한 게시글 초기화
    setSelectContent(0);
    // 댓글 작성 모달 비활성화
    setCommentModalState(false);
    // 내 게시글 찾기 모달 비활성화
    setFindMineModalState(false);
    // 댓글 수정 모달 비활성화
    setUpdateCommentModal(false);
    // 모달 on/off용 boardId 초기화
    setBoardId(0);
    // 게시글 수정 모달 비활성화
    setUpdateModal(false);
    // 선택한 댓글 default 값 초기화
    setCommentState("");
    // 선택한 댓글 commentId 값 초기화
    setCommentId(0);
    // displaySetting Modal 비활성화
    setDisplaySettingModal(false);
  };

  const handleClickModal = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen flex flex-row justify-center items-center bg-cancelBtnColor/50 z-50"
        onMouseDown={handleClickBackground}
      >
        <div
          className="py-20 tablet:w-[800px] w-full tablet:min-w-[750px] min-h-[450px] tablet:max-h-fit max-h-[600px] overflow-auto h-fit bg-bgColor flex flex-col justify-start items-center rounded-md border border-borderColor/50 font-NMSNeo2"
          onMouseDown={handleClickModal}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalContainer;
