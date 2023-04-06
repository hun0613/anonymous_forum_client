import { useMutation, useQueryClient } from "@tanstack/react-query";
import postOption from "../api/postOption";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSetRecoilState } from "recoil";
import { displaySettingModalState } from "../atom/atom";

const usePostOption = () => {
  const queryClient = useQueryClient();

  // setRecoilState
  const setDisplaySettingModal = useSetRecoilState(displaySettingModalState);

  return useMutation(postOption, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["option"]);

      toast.success("적용되었습니다", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });

      setDisplaySettingModal(false);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default usePostOption;
