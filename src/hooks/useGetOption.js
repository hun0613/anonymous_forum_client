import { useQuery } from "@tanstack/react-query";
import getOption from "../api/getOption";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  pageAmountState,
  pageSetAmountState,
  boardListState,
  totalPageAmountState,
  pageSetState,
  currPageState,
} from "../atom/atom";

const useGetOption = () => {
  // recoilValue
  const boardList = useRecoilValue(boardListState);

  // setRecoilState
  const setPageAmount = useSetRecoilState(pageAmountState);
  const setPageSetAmount = useSetRecoilState(pageSetAmountState);
  const setTotalPageAmount = useSetRecoilState(totalPageAmountState); // 전체 페이지 갯수
  const setPageSetState = useSetRecoilState(pageSetState);
  const setCurrPageState = useSetRecoilState(currPageState);

  return useQuery(["option"], getOption, {
    onSuccess: (res) => {
      setPageAmount(res.data[0].pageAmount);
      setPageSetAmount(res.data[0].pageSetAmount);
      setPageSetState(1);
      setCurrPageState(1);
      // totalpage를 전환하는게 좋을듯
      setTotalPageAmount(Math.ceil(boardList.length / res.data[0].pageAmount));
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useGetOption;
