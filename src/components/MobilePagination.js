import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useRecoilState, useRecoilValue } from "recoil";
import { currPageState, totalPageAmountState } from "../atom/atom";

const MobilePagination = () => {
  // useRecoilState
  const [currPage, setCurrPage] = useRecoilState(currPageState);
  // recoilValue
  const totalPage = useRecoilValue(totalPageAmountState);

  const handleClickStartBtn = () => {
    setCurrPage(1);
  };
  const handleClickPrevBtn = () => {
    setCurrPage(currPage - 1);
  };
  const handleClickNextBtn = () => {
    setCurrPage(currPage + 1);
  };
  const handleClickEndBtn = () => {
    setCurrPage(totalPage);
  };

  return (
    <>
      <div className="max-w-[1000px] w-[95%] h-fit flex flex-row justify-center items-center mt-12">
        {/* START btn */}
        {currPage === 1 ? (
          <div className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/20 bg-white drop-shadow-md p-2 rounded mr-4 cursor-default">
            START
          </div>
        ) : (
          <div
            className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer mr-4"
            onClick={handleClickStartBtn}
          >
            START
          </div>
        )}

        {/* PREV btn */}
        {currPage === 1 ? (
          <div className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/20 bg-white drop-shadow-md p-2 rounded mr-4 cursor-default">
            <IoChevronBackSharp />
          </div>
        ) : (
          <div
            className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer mr-4"
            onClick={handleClickPrevBtn}
          >
            <IoChevronBackSharp />
          </div>
        )}

        <div className="w-8 h-8 flex flex-row justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-white bg-pointColor  drop-shadow-md p-2 rounded  mr-4">
          {currPage}
        </div>

        {/* NEXT btn */}
        {currPage === totalPage ? (
          <div className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/20 bg-white drop-shadow-md p-2 rounded mr-4 cursor-default">
            <IoChevronForwardSharp />
          </div>
        ) : (
          <div
            className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer mr-4"
            onClick={handleClickNextBtn}
          >
            <IoChevronForwardSharp />
          </div>
        )}

        {/* END btn */}
        {currPage === totalPage ? (
          <div className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/20 bg-white drop-shadow-md p-2 rounded mr-4 cursor-default">
            END
          </div>
        ) : (
          <div
            className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer"
            onClick={handleClickEndBtn}
          >
            END
          </div>
        )}
      </div>
    </>
  );
};

export default MobilePagination;
