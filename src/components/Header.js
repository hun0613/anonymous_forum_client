import { FaRegSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { adminModalState, adminState, userState, adminName } from "../atom/atom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {

  // setRecoilState
  const setAdminModal = useSetRecoilState(adminModalState);
  const setAdminName = useSetRecoilState(adminName);
  // useRecoilState
  const [admin, setAdminState] = useRecoilState(adminState);
  // recoilValue
  const user = useRecoilValue(userState);

  const handleClickAdmin = () => {
    setAdminModal(true);
  };

  const handleClickLogout = () => {
    localStorage.clear();
    setAdminState(false);
    setAdminName("");
    toast.success("로그아웃 되었습니다", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      <div className="w-full min-h-[80px] bg-pointColor flex flex-col justify-center items-center fixed top-0 z-30">
        <div className="max-w-[1000px] w-full h-fit flex flex-row justify-center items-center">
          <div className="w-fit h-fit flex flex-col justify-center items-center tablet:text-xl text-md text-white font-semibold font-NMSNeo5">
            Anonymous Forum
          </div>
          <div className="max-w-[1000px] w-full min-h-[80px] fixed flex flex-row justify-end items-center">
            {user ? null : admin ? (
              <FiLogOut
                className="text-white tablet:text-2xl text-xl cursor-pointer tablet:mr-4 mr-4"
                onClick={handleClickLogout}
              />
            ) : (
              <FaRegSun
                className="text-white tablet:text-2xl text-xl cursor-pointer tablet:mr-4 mr-4"
                onClick={handleClickAdmin}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
