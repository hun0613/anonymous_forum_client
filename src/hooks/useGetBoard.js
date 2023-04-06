import { useQuery } from "@tanstack/react-query";
import getBoard from "../api/getBoard";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { boardListState, pageAmountState, totalPageAmountState, pageSetAmountState } from "../atom/atom";

const useGetBoard = () => {
  // setRecoilState
  const setBoardList = useSetRecoilState(boardListState); // 전체 게시글 상태
  const setTotalPageAmount = useSetRecoilState(totalPageAmountState); // 전체 페이지 갯수

  // recoilValue
  const pageAmount = useRecoilValue(pageAmountState); // 한 페이지당 보여줄 게시글 수
  const pageSetAmount = useRecoilValue(pageSetAmountState); // 한 묶음당 보여질 페이지 개수

  return useQuery(["board"], getBoard, {
    onSuccess: (res) => {
      setBoardList(res.data);
      // console.log(res.data.length, pageAmount)
      
      // pageSet이 1세트 밖에 나오지 않는 경우
      if (res.data.length <= pageAmount * pageSetAmount){
        setTotalPageAmount(Math.ceil(res.data.length / pageAmount));
      }
      // pageSet이 2세트 이상 나오는 경우
      else{
        setTotalPageAmount(Math.ceil(res.data.length / pageAmount));
      }
    },
    onError: (err) => {
      console.log(err);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetBoard;
