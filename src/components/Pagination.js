import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  totalPageAmountState,
  pageSetState,
  boardListState,
  pageAmountState,
  currPageState,
  pageSetAmountState,
} from "../atom/atom";

const Pagination = () => {
  // recoilValue
  const totalPageAmount = useRecoilValue(totalPageAmountState);
  const pageAmount = useRecoilValue(pageAmountState);
  const boardList = useRecoilValue(boardListState);
  const pageSetAmount = useRecoilValue(pageSetAmountState);

  // useRecoilState
  const [pageSet, setPageSet] = useRecoilState(pageSetState);
  const [currPage, setCurrPage] = useRecoilState(currPageState);

  // 페이지 컴포넌트로 매핑될 임시배열
  const pageArr = Array(totalPageAmount)
    .fill()
    .map((el, idx) => idx + 1);

  // 전체 페이지 수 slice의 첫번째 인자
  const startOfSlice = (pageSet - 1) * pageSetAmount;

  // 전체 페이지 수 slice의 두번째 인자
  const endOfSlice = pageSet * pageSetAmount;

  // 페이지 묶음의 최대값
  const maxPageSet = Math.ceil(boardList.length / (pageAmount * pageSetAmount));

  const handleClickPrevBtn = () => {
    setPageSet(pageSet - 1);
    // pageSet 변경 후 현재 페이지는 자동으로 각 set의 가장 첫 페이지
    setCurrPage((pageSet - 2) * pageSetAmount + 1);
  };

  const handleClickNextBtn = () => {
    setPageSet(pageSet + 1);
    // pageSet 변경 후 현재 페이지는 자동으로 각 set의 가장 첫 페이지
    setCurrPage(pageSet * pageSetAmount + 1);
  };

  const handleClickPageBtn = (el) => {
    if (el !== currPage) {
      setCurrPage(el);
    }
  };

  const handleClickStartBtn = () => {
    setPageSet(1);
    setCurrPage(1);
  };

  const handleClickEndBtn = () => {
    setPageSet(maxPageSet);
    setCurrPage(totalPageAmount);
  };

  return (
    <>
      <div className="max-w-[1000px] w-[95%] h-fit flex flex-row justify-center items-center mt-12">
        {/* START btn */}
        {currPage === 1 && pageSet === 1 ? (
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
        {pageSet === 1 ? (
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

        {/* 페이지 컴포넌트 */}
        {pageArr.length <= pageSetAmount
          ? pageArr.map((el) => {
              return (
                <div
                  key={el}
                  className={
                    el === currPage
                      ? // 선택된 페이지버튼 style
                        `w-8 h-8 flex flex-row justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-white bg-pointColor  drop-shadow-md p-2 rounded  mr-4 cursor-default`
                      : // 일반 페이지버튼  style
                        `w-8 h-8 flex flex-row justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-textColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer mr-4`
                  }
                  onClick={() => handleClickPageBtn(el)}
                >
                  {el}
                </div>
              );
            })
          : pageArr.slice(startOfSlice, endOfSlice).map((el) => {
              return (
                <div
                  key={el}
                  className={
                    el === currPage
                      ? // 선택된 페이지버튼 style
                        `w-8 h-8 flex flex-row justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-white bg-pointColor  drop-shadow-md p-2 rounded  mr-4`
                      : // 일반 페이지버튼  style
                        `w-8 h-8 flex flex-row justify-center items-center font-NMSNeo3 tablet:text-sm text-xs text-textColor/80 bg-white hover:bg-grayColor drop-shadow-md p-2 rounded cursor-pointer mr-4`
                  }
                  onClick={() => handleClickPageBtn(el)}
                >
                  {el}
                </div>
              );
            })}

        {/* NEXT btn */}
        {pageSet === maxPageSet ? (
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
        {currPage === totalPageAmount && pageSet === maxPageSet ? (
          <div className="w-fit h-fit flex flex-row justify-center items-center font-NMSNeo5 tablet:text-sm text-xs text-pointColor/20 bg-white drop-shadow-md p-2 rounded cursor-default">
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

export default Pagination;
