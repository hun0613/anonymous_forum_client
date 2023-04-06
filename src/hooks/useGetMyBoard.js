import { useQuery } from "@tanstack/react-query";
import getMyBoard from "../api/getMyBoard";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  boardListState,
  findMineModalState,
  userState,
  adminState,
  adminName,
  pageAmountState,
  totalPageAmountState,
  pageSetState,
  currPageState
} from "../atom/atom";

const useGetMyBoard = (email) => {
  const setBoardList = useSetRecoilState(boardListState);
  const setFindMineModalState = useSetRecoilState(findMineModalState);
  const setUserState = useSetRecoilState(userState);
  const setAdminState = useSetRecoilState(adminState);
  const setAdminName = useSetRecoilState(adminName);
  const setTotalPageAmount = useSetRecoilState(totalPageAmountState); // 전체 페이지 갯수
  const setPageSetState = useSetRecoilState(pageSetState);
  const setCurrPageState = useSetRecoilState(currPageState);
  // recoilValue
  const pageAmount = useRecoilValue(pageAmountState); // 한 페이지당 보여줄 게시글 수

  return useQuery(["myBoard"], () => getMyBoard(email), {
    enabled: false,
    onSuccess: (res) => {
      setBoardList(res.data);
      setFindMineModalState(false);
      setUserState(true);
      setAdminState(false);
      setAdminName("");
      setPageSetState(1);
      setCurrPageState(1);

      // pageSet이 1세트 밖에 나오지 않는 경우
      if (res.data.length <= pageAmount * 10) {
        setTotalPageAmount(Math.ceil(res.data.length / pageAmount));
      }
      // pageSet이 2세트 이상 나오는 경우
      else {
        setTotalPageAmount(Math.ceil(res.data.length / pageAmount));
      }
    },
    retry: 1,
  });
};

export default useGetMyBoard;
