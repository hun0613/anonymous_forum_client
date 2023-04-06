import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import useTransformDateForm from "../hooks/useTransformDateFormat";

const { persistAtom } = recoilPersist();

// 글작성모달 컨트롤
const createModalState = atom({
  key: "createModalState",
  default: false,
});

// 관리자인증 모달 컨트롤
const adminModalState = atom({
  key: "adminModalState",
  default: false,
});

// 댓글 작성 모달 컨트롤
const commentModalState = atom({
  key: "commentModalState",
  default: false,
});

// 사용자 인증 모달 컨트롤
const findMineModalState = atom({
  key: "findMindModalState",
  default: false,
});

// 관리자메뉴 모달 컨트롤 (현재 사용 X)
const adminMenuState = atom({
  key: "adminMenuState",
  default: false,
});

// 클릭한 게시글에 대한 boardId값
const selectContentState = atom({
  key: "selectContentState",
  default: 0,
});

// 클릭한 댓글에 대한 depth값
const selectCommentDepthState = atom({
  key: "selectCommentDepthState",
  default: 0,
});

// 클릭한 댓글에 대한 refId값
const selectCommentRefIdState = atom({
  key: "selectCommentRefIdState",
  default: 0,
});

// 사용자 인증 시 사용한 email값
const selectEmailState = atom({
  key: "selectEmailState",
  default: "",
});

// 관리자 인증 여부
const adminState = atom({
  key: "adminState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 사용자 인증 여부
const userState = atom({
  key: "userState",
  default: false,
});

// 게시글 리스트
const boardListState = atom({
  key: "boardListState",
  default: [],
});

// getMyBoard 재요청 트리거
const myBoardRefetchTrigger = atom({
  key: "myBoardRefetchTrigger",
  default: false,
});

// 게시글설정 모달 컨트롤
const boardSettingModalState = atom({
  key: "boardSettingModalState",
  default: false,
});

// 게시글모달 판별용 boardId 값
const modalControlBoardIdState = atom({
  key: "modalControlBoardId",
  default: 0,
});

// 게시글수정 시 default title 값
const defaultTitleState = atom({
  key: "defaultTitleState",
  default: "",
});

// 게시글수정 시 default content 값
const defaultContentState = atom({
  key: "defaultContentState",
  default: "",
});

// 게시글 수정 모달 컨트롤
const updateModalState = atom({
  key: "updateModalState",
  default: false,
});

// 댓글 설정 모달 컨트롤
const commentSettingModalState = atom({
  key: "commentSettingModalState",
  default: false,
});

// 댓글 설정 모달 판별용 commentId 값
const commentSettingCommentId = atom({
  key: "commentSettingCommentId",
  default: 0,
});

// 관리자 이름
const adminName = atom({
  key: "adminName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 댓글수정 시 default content 값
const defaultCommentContentState = atom({
  key: "defaultCommentContentState",
  default: "",
});

// 댓글 수정모달 컨트롤
const updateCommentModalState = atom({
  key: "updateCommentModalState",
  default: false,
});

// 디스플레이 설정 모달 컨트롤
const displaySettingModalState = atom({
  key: "displaySettingModalState",
  default: false,
});

// // 차트 기간 시작범위

// const startDateOfChart = atom({
//   key: "startDateOfChart",
//   default: useTransformDateForm(new Date(currTime.getTime() - 6 * 24 * 60 * 60 * 1000)),
// });

// // 차트 기간 종료범위
// const endDateOfChart = atom({
//   key: "endDateOfChart",
//   default: useTransformDateForm(new Date()),
// });

// 페이지네이션 상태

// 한 페이지당 보여줄 게시글 수
const pageAmountState = atom({
  key: "pageAmountState",
  default: 5,
});

// 전체 페이지 갯수
const totalPageAmountState = atom({
  key: "totalPageAmountState",
  default: 0,
});

// 현재 페이지 그룹
const pageSetState = atom({
  key: "pageSetState",
  default: 1,
});

// 현재 페이지
const currPageState = atom({
  key: "currPageState",
  default: 1,
});

// 한 묶음당 보여질 페이지 개수
const pageSetAmountState = atom({
  key: "pageSetAmountState",
  default: 10,
});

export {
  createModalState,
  adminModalState,
  adminMenuState,
  selectContentState,
  adminState,
  commentModalState,
  findMineModalState,
  boardListState,
  userState,
  selectEmailState,
  myBoardRefetchTrigger,
  boardSettingModalState,
  modalControlBoardIdState,
  defaultTitleState,
  defaultContentState,
  updateModalState,
  selectCommentDepthState,
  selectCommentRefIdState,
  adminName,
  commentSettingModalState,
  commentSettingCommentId,
  defaultCommentContentState,
  updateCommentModalState,
  pageAmountState,
  totalPageAmountState,
  pageSetState,
  currPageState,
  pageSetAmountState,
  displaySettingModalState,
  // startDateOfChart,
  // endDateOfChart,
};
