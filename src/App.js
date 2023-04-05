import "./App.css";
import Header from "./components/Header";
import Guide from "./components/Guide";
import WriteBtn from "./components/WriteBtn";
import Content from "./components/Content";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  createModalState,
  adminModalState,
  adminState,
  commentModalState,
  findMineModalState,
  boardListState,
  userState,
  selectEmailState,
  myBoardRefetchTrigger,
  updateModalState,
  modalControlBoardIdState,
  boardSettingModalState,
  commentSettingCommentId,
  commentSettingModalState,
  updateCommentModalState,
  currPageState,
  pageAmountState,
} from "./atom/atom";
import useGetBoard from "./hooks/useGetBoard";
import ModalContainer from "./components/reuse/ModalContainer";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import AdminModal from "./components/AdminModal";
import CommentModal from "./components/CommentModal";
import FindMineBtn from "./components/FindMineBtn";
import FindMineModal from "./components/FindMineModal";
import useGetMyBoard from "./hooks/useGetMyBoard";
import ReturnBtn from "./components/ReturnBtn";
import DashBoard from "./components/DashBoard";
import Footer from "./components/Footer";
import UpdateCommentModal from "./components/UpdateCommentModal";
import Pagination from "./components/Pagination";
import MobilePagination from "./components/MobilePagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import useGetOption from "./hooks/useGetOption";

function App() {
  // setRecoilValue
  const setBoardId = useSetRecoilState(modalControlBoardIdState);
  const setBoardSettingModal = useSetRecoilState(boardSettingModalState);
  const setSettingControlCommentId = useSetRecoilState(commentSettingCommentId);
  const setCommentSettingModal = useSetRecoilState(commentSettingModalState);

  // recoilValue
  const activeCreativeModal = useRecoilValue(createModalState);
  const activeAdminModal = useRecoilValue(adminModalState);
  const admin = useRecoilValue(adminState);
  const activeCommentModal = useRecoilValue(commentModalState);
  const activeFindMineModal = useRecoilValue(findMineModalState);
  const boardList = useRecoilValue(boardListState);
  const user = useRecoilValue(userState);
  const emailState = useRecoilValue(selectEmailState);
  const trigger = useRecoilValue(myBoardRefetchTrigger);
  const activeUpdateModal = useRecoilValue(updateModalState);
  const activeUpdateCommentModal = useRecoilValue(updateCommentModalState);
  const currPage = useRecoilValue(currPageState);
  const pageAmount = useRecoilValue(pageAmountState);

  // 게시글 조회 api요청함수 호출
  useGetBoard();

  // 옵션 조회 api요청함수 호출
  useGetOption();

  // window width size
  const width = useWindowSize();

  // react-query
  const { refetch } = useGetMyBoard(emailState);

  // 빈공간 클릭시 호출함수
  const handleClickBackground = () => {
    setBoardId(0);
    setBoardSettingModal(false);
    setSettingControlCommentId(0);
    setCommentSettingModal(false);
  };

  // 내 게시글 요청
  useEffect(() => {
    if (user && emailState) {
      refetch();
    }
  }, [trigger]);

  return (
    <>
      <ToastContainer />
      <div
        className="w-full h-full overflow-auto flex flex-col justify-start items-center"
        onClick={handleClickBackground}
      >
        <Header />
        <div className="w-full h-full flex flex-col justify-start items-center mt-20">
          <Guide />
          {/* btn */}
          <div className="w-full h-fit flex flex-row justify-center items-center mt-3 mb-4 p-2">
            <WriteBtn />
            {user ? <ReturnBtn /> : <FindMineBtn />}
          </div>
          {admin || user ? (
            <div className="w-full h-50 flex-col justify-center items-center">
              <div className="w-full h-fit justify-center items-center flex tablet:flex-row flex-col">
                <div className="w-fit h-fit justify-center items-center tablet:text-md text-sm flex flex-col text-pointColor font-NMSNeo2">
                  게시글을 클릭하여 댓글을 달아보세요
                </div>
              </div>
            </div>
          ) : null}

          {admin || user ? (
            <div className="w-full h-fit flex flex-col justify-center items-center mb-10">
              {boardList
                .slice((currPage - 1) * pageAmount, (currPage - 1) * pageAmount + pageAmount)
                .map((el) => {
                  return (
                    <Content
                      key={el.boardId}
                      id={el.boardId}
                      title={el.title}
                      content={el.content}
                      createAt={el.createAt}
                      comment={el.comment}
                    />
                  );
                })}
              {/* 페이지 컴포넌트 */}
              {width > 790 ? <Pagination /> : <MobilePagination />}
            </div>
          ) : (
            <DashBoard />
          )}
        </div>

        {/* 푸터 컴포넌트 */}
        <Footer />

        {/* 글작성모달 */}
        {activeCreativeModal ? (
          <ModalContainer>
            <CreateModal />
          </ModalContainer>
        ) : null}

        {/* 관리자인증 모달 */}
        {activeAdminModal ? (
          <ModalContainer>
            <AdminModal />
          </ModalContainer>
        ) : null}

        {/* 댓글작성 모달 */}
        {activeCommentModal ? (
          <ModalContainer>
            <CommentModal />
          </ModalContainer>
        ) : null}

        {/* 내 게시글 찾기 모달 */}
        {activeFindMineModal ? (
          <ModalContainer>
            <FindMineModal />
          </ModalContainer>
        ) : null}

        {/* 게시글 수정 모달 */}
        {activeUpdateModal ? (
          <ModalContainer>
            <UpdateModal />
          </ModalContainer>
        ) : null}

        {/* 댓글 수정 모달 */}
        {activeUpdateCommentModal ? (
          <ModalContainer>
            <UpdateCommentModal />
          </ModalContainer>
        ) : null}
      </div>
    </>
  );
}

export default App;
