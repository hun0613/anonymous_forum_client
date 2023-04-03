import { useQuery } from "@tanstack/react-query";
import getBoard from "../api/getBoard";
import { useSetRecoilState } from "recoil";
import { boardListState } from "../atom/atom";

const useGetBoard = () => {
  const setBoardList = useSetRecoilState(boardListState);

  return useQuery(["board"], getBoard, {
    onSuccess: (res) => {
      setBoardList(res.data);
    },
    onError: (err) => {
      console.log(err);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetBoard;
