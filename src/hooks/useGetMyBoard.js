import { useQuery } from "@tanstack/react-query";
import getMyBoard from "../api/getMyBoard";
import { useSetRecoilState } from "recoil";
import { boardListState, findMineModalState, userState, adminState, adminName } from "../atom/atom";

const useGetMyBoard = (email) => {
  const setBoardList = useSetRecoilState(boardListState);
  const setFindMineModalState = useSetRecoilState(findMineModalState);
  const setUserState = useSetRecoilState(userState);
  const setAdminState = useSetRecoilState(adminState);
  const setAdminName = useSetRecoilState(adminName);

  return useQuery(["myBoard"], () => getMyBoard(email), {
    enabled: false,
    onSuccess: (res) => {
      setBoardList(res.data);
      setFindMineModalState(false);
      setUserState(true);
      setAdminState(false);
      setAdminName("");
    },
    retry: 1,
  });
};

export default useGetMyBoard;
