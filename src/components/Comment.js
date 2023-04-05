import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  selectCommentDepthState,
  selectCommentRefIdState,
  selectContentState,
  commentModalState,
  adminState,
  userState,
  adminName,
  commentSettingCommentId,
  commentSettingModalState,
  defaultCommentContentState,
  updateCommentModalState,
  boardSettingModalState,
} from "../atom/atom";
import Swal from "sweetalert2";
import { FiMoreHorizontal } from "react-icons/fi";
import { useEffect, useState } from "react";
import useDeleteComment from "../hooks/useDeleteComment";

const Comment = (comment) => {
  const time = new Date(comment.createAt);
  const [year, month, day, hour, minute, second] = [
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ];

  // react-query
  const { mutate } = useDeleteComment();

  // useSetRecoilState
  const setSelectBoardId = useSetRecoilState(selectContentState); // 선택된 게시글 boardId
  const setSelectCommentDepth = useSetRecoilState(selectCommentDepthState); // 선택된 댓글 Depth
  const setCommentModal = useSetRecoilState(commentModalState); // 댓글 입력창 컨트롤
  const setDefaultCommentContent = useSetRecoilState(defaultCommentContentState); // 댓글 수정 시 default 값
  const activeUpdateCommentModal = useSetRecoilState(updateCommentModalState);
  const setBoardSettingModal = useSetRecoilState(boardSettingModalState);
  // recoilValue
  const user = useRecoilValue(userState); // 사용자 인증 여부
  const admin = useRecoilValue(adminState); // 관리자 인증 여부
  const adminNameValue = useRecoilValue(adminName); // 인증된 관리자 이름

  // useRecoilValue
  const [settingControlCommentId, setSettingControlCommentId] =
    useRecoilState(commentSettingCommentId);
  const [commentSettingModal, setCommentSettingModal] = useRecoilState(commentSettingModalState);
  const [selectCommentRefId, setSelectCommentRefId] = useRecoilState(selectCommentRefIdState); // 선택된 댓글 commentId (등록될 댓글의 refId로 사용)

  // useState
  const [isDelete, setIsDelete] = useState(false);

  // 댓글 onClick 호출함수
  const handleClickComment = () => {
    if (!comment.delete) {
      setSelectBoardId(comment.bundleId);
      setSelectCommentDepth(comment.depth + 1);
      setSelectCommentRefId(comment.commentId);
      setCommentModal(true);
      setCommentSettingModal(false);
    }
  };

  // 댓글 설정버튼 onClick 호출함수
  const handleClickSetting = (event) => {
    event.stopPropagation();
    setBoardSettingModal(false);

    if (settingControlCommentId === comment.commentId) {
      setCommentSettingModal(false);
      setSettingControlCommentId(0);
    } else {
      setSettingControlCommentId(comment.commentId);
      setCommentSettingModal(true);
    }
  };

  // 수정버튼 onClick 호출함수
  const handleClickUpdate = (event) => {
    event.stopPropagation();
    // 수정 모달에서 default값으로 표시될 content값 할당
    setDefaultCommentContent(comment.content);
    // 수정 모달에서 요청 시 사용될 commentId
    setSelectCommentRefId(comment.commentId);
    // 댓글 수정 모달 활성화
    activeUpdateCommentModal(true);
    // 댓글 설정 모달 비활성화
    setCommentSettingModal(false);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setSelectCommentRefId(comment.commentId);
    setIsDelete(true);
    setCommentSettingModal(false);
    setSettingControlCommentId(0);
  };

  useEffect(() => {
    if (selectCommentRefId !== 0 && isDelete) {
      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        customClass: "customSwal2",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDelete(false);
          mutate(comment.commentId);
        }
      });
      setSelectCommentRefId(0);
      setIsDelete(false);
    }
  }, [selectCommentRefId]);

  return (
    <>
      <div
        className={
          comment.delete
            ? // 삭제된 댓글인 경우
              comment.depth === 0
              ? `relative tablet:max-w-[900px] w-[95%] min-h-[100px] h-fit bg-white drop-shadow-md rounded-md p-5 my-3 font-NMSNeo2`
              : comment.depth === 1
              ? `relative tablet:max-w-[800px] w-[85%] min-h-[100px] h-fit bg-white drop-shadow-md rounded-md p-5 my-3 font-NMSNeo2`
              : comment.depth === 2
              ? `relative tablet:max-w-[700px] w-[75%] min-h-[100px] h-fit bg-white drop-shadow-md rounded-md p-5 my-3 font-NMSNeo2`
              : comment.depth === 3
              ? `relative tablet:max-w-[600px] w-[65%] min-h-[100px] h-fit bg-white drop-shadow-md rounded-md p-5 my-3 font-NMSNeo2`
              : `relative tablet:max-w-[500px] w-[55%] min-h-[100px] h-fit bg-white drop-shadow-md rounded-md p-5 my-3 font-NMSNeo2`
            : // 삭제되지 않은 댓글인 경우
            comment.depth === 0
            ? `relative tablet:max-w-[900px] w-[95%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-grayColor rounded-md p-5 my-3 font-NMSNeo2 cursor-pointer`
            : comment.depth === 1
            ? `relative tablet:max-w-[800px] w-[85%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-grayColor rounded-md p-5 my-3 font-NMSNeo2 cursor-pointer`
            : comment.depth === 2
            ? `relative tablet:max-w-[700px] w-[75%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-grayColor rounded-md p-5 my-3 font-NMSNeo2 cursor-pointer`
            : comment.depth === 3
            ? `relative tablet:max-w-[600px] w-[65%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-grayColor rounded-md p-5 my-3 font-NMSNeo2 cursor-pointer`
            : `relative tablet:max-w-[500px] w-[55%] min-h-[100px] h-fit bg-white drop-shadow-md hover:bg-grayColor rounded-md p-5 my-3 font-NMSNeo2 cursor-pointer`
        }
        onClick={handleClickComment}
      >
        <div className="relative w-full h-fit flex flex-col justify-center items-start">
          {/* setting btn */}
          {/* 관리자 로그인상태 && 본인이 작성한 글일 경우 */}
          {admin && comment.admin === adminNameValue && !comment.delete ? (
            <FiMoreHorizontal
              className="absolute top-0 right-0 text-xl text-textColor hover:text-pointColor/30"
              onClick={handleClickSetting}
            />
          ) : user && !comment.admin && !comment.delete ? (
            <FiMoreHorizontal
              className="absolute top-0 right-0 text-xl text-textColor hover:text-pointColor/30"
              onClick={handleClickSetting}
            />
          ) : null}

          {/* 댓글설정 모달 */}
          {commentSettingModal && settingControlCommentId === comment.commentId ? (
            <div className="absolute right-0 top-5 w-20 h-fit p-3 flex flex-col justify-center items-center border border-borderColor bg-white/90 rounded-md">
              <div
                className="w-full h-fit flex flex-col justify-center items-center text-sm font-NMSNeo3 text-textColor hover:text-textColor/50 cursor-pointer mb-4"
                onClick={handleClickUpdate}
              >
                수정하기
              </div>

              <div
                className="w-full h-fit flex flex-col justify-center items-center text-sm font-NMSNeo3 text-negativeColor hover:text-negativeColor/50 cursor-pointer"
                onClick={handleClickDelete}
              >
                삭제하기
              </div>
            </div>
          ) : null}

          {/* admin속성이 있을 경우 관리자 아이콘 표기 */}
          {comment.admin ? (
            <div
              className={
                comment.delete
                  ? `w-fit h-fit flex flex-row justify-center items-center tablet:text-xs text-[10px] mb-2 bg-pointColor/30 rounded-md py-2 px-3 text-white font-NMSNeo2`
                  : `w-fit h-fit flex flex-row justify-center items-center tablet:text-xs text-[10px] mb-2 bg-pointColor/90 rounded-md py-2 px-3 text-white font-NMSNeo2`
              }
            >
              {`관리자 ${comment.admin}`}
            </div>
          ) : null}
          {/* 내용 */}
          <div
            className={
              comment.delete
                ? `w-full h-fit flex flex-row justify-start items-center tablet:text-base text-sm mb-5 text-textColor/20`
                : `w-full h-fit flex flex-row justify-start items-center tablet:text-base text-sm mb-5 text-textColor`
            }
          >
            {comment.content}
          </div>
        </div>
        {/* 작성일시 */}
        <div
          className={
            comment.delete
              ? `w-full h-fit flex flex-row justify-end items-center tablet:text-sm text-xs text-textColor/20`
              : `w-full h-fit flex flex-row justify-end items-center tablet:text-sm text-xs text-textColor`
          }
        >
          {`${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`}
        </div>
      </div>
      {/* 대댓글 재귀 */}
      {comment.comment.map((el) => {
        if (el.refId === comment.commentId) {
          return (
            <Comment
              key={el.commentId}
              bundleId={comment.bundleId}
              comment={comment.comment}
              commentId={el.commentId}
              depth={el.depth}
              refId={el.refId}
              admin={el.admin}
              content={el.content}
              createAt={el.createAt}
              delete={el.delete}
            />
          );
        }
      })}
    </>
  );
};

export default Comment;
