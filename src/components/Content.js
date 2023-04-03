import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  selectContentState,
  adminState,
  commentModalState,
  userState,
  boardListState,
  adminModalState,
  myBoardRefetchTrigger,
  boardSettingModalState,
  modalControlBoardIdState,
  defaultTitleState,
  defaultContentState,
  updateModalState,
  selectCommentDepthState,
  selectCommentRefIdState,
  commentSettingModalState
} from "../atom/atom";
import { BiLock } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import Swal from "sweetalert2";
import useDeleteBoard from "../hooks/useDeleteBoard";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";

const Content = ({ id, title, content, createAt, comment }) => {
  const queryClient = useQueryClient();
  const time = new Date(createAt);
  const [year, month, day, hour, minute, second] = [
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ];

  // recoilValue
  const boardList = useRecoilValue(boardListState); // 게시글 목록
  const admin = useRecoilValue(adminState); // 관리자 접속여부

  // setRecoilState
  const activeCommentModal = useSetRecoilState(commentModalState); // 댓글모달 컨트롤
  const setAdminModal = useSetRecoilState(adminModalState); // 관리자인증모달 컨트롤
  const setDefaultTitle = useSetRecoilState(defaultTitleState); // 게시글 수정 시 default title 컨트롤
  const setDefaultContent = useSetRecoilState(defaultContentState); // 게시글 수정 시 default content 컨트롤
  const setUpdateModal = useSetRecoilState(updateModalState); // 게시글 수정 모달 컨트롤
  const setSelectCommentDepth = useSetRecoilState(selectCommentDepthState); // 댓글에 대한 Depth 값
  const setSelectCommentRefId = useSetRecoilState(selectCommentRefIdState); // 댓글에 대한 RefId 값
  const setUpdateCommentModal = useSetRecoilState(commentSettingModalState); // 댓글 설정 모달 컨트롤

  // useReciolState
  const [selectContent, setSelectContent] = useRecoilState(selectContentState); // 클릭한 게시글 boardId
  const [boardId, setBoardId] = useRecoilState(modalControlBoardIdState); // 설정모달 컨트롤 확인용 클릭한 게시글 boardId
  const [user, setUserState] = useRecoilState(userState); // 사용자인증 여부
  const [trigger, setTrigger] = useRecoilState(myBoardRefetchTrigger); // myBoard refetch용 트리거
  const [boardSettingModal, setBoardSettingModal] = useRecoilState(boardSettingModalState); // 설정모달 컨트롤

  // useState
  const [isDelte, setIsDelete] = useState(false); // 삭제, 수정 판별용 상태

  // react-query
  const { mutate, isSuccess } = useDeleteBoard(); // 삭제요청

  // 삭제함수
  const handleClickDelete = (event) => {
    setIsDelete(true);
    setSelectContent(id);
    setBoardSettingModal(false);
    setBoardId(0);
    event.stopPropagation();
  };

  // 수정함수
  const handleClickUpdate = (event) => {
    setSelectContent(id);
    setBoardSettingModal(false);
    setBoardId(0);

    setDefaultTitle(title);
    setDefaultContent(content);

    setUpdateModal(true);

    event.stopPropagation();
  };

  // 댓글작성 모달 활성화 함수
  const handleClickContent = () => {
    setSelectContent(id);
    setSelectCommentDepth(0);
    setSelectCommentRefId(0);
    activeCommentModal(true);
    setBoardSettingModal(false);
  };

  // 설정아이콘 클릭함수
  const handleClickSetting = (event) => {
    event.stopPropagation();
    setUpdateCommentModal(false);

    if (id === boardId) {
      setBoardSettingModal(false);
      setBoardId(0);
    } else {
      setBoardId(id);
      setBoardSettingModal(true);
    }
  };

  // 게시글 클릭 시 발생하는 로직
  useEffect(() => {
    if (selectContent !== 0 && isDelte) {
      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        customClass: "customSwal2",
      }).then((result) => {
        if (result.isConfirmed) {
          mutate(selectContent);
          setIsDelete(false);
        }
      });
      setSelectContent(0);
      setIsDelete(false);
    }
  }, [selectContent]);

  // delete mutation이 성공할 경우 처리되는 로직
  useEffect(() => {
    if (isSuccess) {
      if (user) {
        if (boardList.length > 1) {
          setTrigger(!trigger);
        } else {
          queryClient.invalidateQueries(["board"]);
          setUserState(false);
        }
      } else {
        queryClient.invalidateQueries(["board"]);
        setAdminModal(false);
        setSelectContent(0);
      }
      toast.success("삭제되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [isSuccess]);

  return (
    <>
      {/* 게시글 */}
      {admin || user ? (
        <div
          className="relative max-w-[1000px] w-[95%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-bgColor text-textColor rounded-md p-5 my-3 mt-16 font-NMSNeo2 cursor-pointer"
          onClick={handleClickContent}
        >
          <div className="w-full h-fit flex flex-row justify-between items-start">
            <div className="w-fit h-fit flex flex-row justify-start items-center tablet:text-lg text-base mb-3 font-semibold">
              {title}
            </div>
            <div className="w-fit min-w-[60px] h-fit flex flex-col justify-start items-end">
              <FiMoreHorizontal
                className="text-xl text-textColor hover:text-pointColor/30"
                onClick={handleClickSetting}
              />
            </div>
            {/* 게시글 수정,삭제 모달 */}
            {boardSettingModal && id === boardId ? (
              <div className="absolute right-5 top-10 w-20 h-fit p-3 flex flex-col justify-center items-center border border-borderColor bg-white/90 rounded-md">
                {admin ? null : (
                  <div
                    className="w-full h-fit flex flex-col justify-center items-center text-sm font-NMSNeo3 text-textColor hover:text-textColor/50 cursor-pointer mb-4"
                    onClick={handleClickUpdate}
                  >
                    수정하기
                  </div>
                )}

                <div
                  className="w-full h-fit flex flex-col justify-center items-center text-sm font-NMSNeo3 text-negativeColor hover:text-negativeColor/50 cursor-pointer"
                  onClick={handleClickDelete}
                >
                  삭제하기
                </div>
              </div>
            ) : null}
          </div>

          <div className="w-full h-fit flex flex-row justify-start items-center tablet:text-base text-sm mb-5">
            {content}
          </div>
          <div className="w-full h-fit flex flex-row justify-end items-center tablet:text-sm text-xs">
            {`${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`}
          </div>
        </div>
      ) : (
        <div className="max-w-[1000px] w-[95%] min-h-[100px] h-fit bg-boardColor/30 rounded-md p-5 my-3 font-NMSNeo3 flex felx-col justify-center items-center">
          <div className="w-full h-fit flex flex-row justify-center items-center">
            <div className="w-fit h-fit flex flex-col justify-center items-center tablet:text-lg text-base text-secretColor">
              <BiLock className="mb-2 text-3xl" />
              비밀글입니다
            </div>
          </div>
        </div>
      )}
      {/* 댓글 */}
      <div className="max-w-[1000px] w-[95%] h-fit flex flex-col justify-center items-end">
        {comment &&
          comment.map((el) => {
            if (el.depth === 0) {
              return (
                <Comment
                  key={el.commentId}
                  bundleId={id}
                  comment={comment}
                  commentId={el.commentId}
                  depth={el.depth}
                  refId={el.refId}
                  admin={el.admin}
                  content={el.content}
                  createAt={el.createAt}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default Content;
