import { userState } from "../atom/atom";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";

const ReturnBtn = () => {
  const queryClient = useQueryClient();
  const setUserState = useSetRecoilState(userState);

  const handleClickReturn = () => {
    setUserState(false);
    queryClient.invalidateQueries(["board"]);
  };

  return (
    <>
      <button
        type="button"
        className="w-fit h-fit tablet:px-10 px-7 py-2 bg-pointColor hover:bg-pointColor/70 rounded-md text-white tablet:text-base text-sm font-NMSNeo2"
        onClick={handleClickReturn}
      >
        처음으로 돌아가기
      </button>
    </>
  );
};

export default ReturnBtn;
