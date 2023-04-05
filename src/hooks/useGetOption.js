import { useQuery } from "@tanstack/react-query";
import getOption from "../api/getOption";
import { useSetRecoilState } from "recoil";
import { pageAmountState, pageSetAmountState } from "../atom/atom";

const useGetOption = () => {
  // setRecoilState
  const setPageAmount = useSetRecoilState(pageAmountState);
  const setPageSetAmount = useSetRecoilState(pageSetAmountState);

  return useQuery(["option"], getOption, {
    onSuccess: (res) => {
      setPageAmount(res.data[0].pageAmount);
      setPageSetAmount(res.data[0].pageSetAmount);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useGetOption;
