import { useRecoilValue } from "recoil";
import { boardListState } from "../atom/atom";

const DashBoard = () => {
  // recoilValue
  const boardList = useRecoilValue(boardListState);

  // 이번달 계산
  const currMonth = new Date().getMonth() + 1;

  // 이번달 작성된 게시글 필터링
  const currMonthData = boardList.filter(
    (el) => new Date(el.createAt).getMonth() + 1 === currMonth
  );

  // 지난달 작성된 게시글 필터링
  const previosMonthData = boardList.filter(
    (el) => new Date(el.createAt).getMonth() + 1 === currMonth - 1
  );

  return (
    <>
      <div className="max-w-[1000px] w-[95%] h-fit flex flex-col justify-center items-center tablet:mt-10 mt-3">
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-xl text-textColor/70">
          Dashboard
        </div>
        <div className="w-full h-fit flex tablet:flex-row flex-col justify-between items-center tablet:mt-10 mt-5">
          {/* dashboard content */}
          <div className="relative tablet:w-[32%] w-full h-fit tablet:pt-[32%] pt-[60%] bg-bgColor drop-shadow-md flex flex-col justify-center items-center rounded-md">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
              {/* title */}
              <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo4 tablet:text-xl text-lg text-textColor/70">
                총 게시글 수
              </div>
              <div className="w-full h-fit flex flex-row justify-center items-end tablet:mt-5 mt-3">
                {/* count */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-4xl text-3xl text-pointColor/70">
                  {boardList.length}
                </div>
                {/* unit */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-lg text-pointColor/70 ml-1">
                  개
                </div>
              </div>
            </div>
          </div>
          {/* dashboard content */}
          <div className="relative tablet:w-[32%] w-full h-fit tablet:pt-[32%] pt-[60%] tablet:mt-0 mt-5 bg-bgColor drop-shadow-md flex flex-col justify-center items-center rounded-md">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
              {/* title */}
              <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo4 tablet:text-xl text-lg text-textColor/70">
                이번달 게시글 수
              </div>
              <div className="w-full h-fit flex flex-row justify-center items-end tablet:mt-5 mt-3">
                {/* count */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-4xl text-3xl text-pointColor/70">
                  {currMonthData.length}
                </div>
                {/* unit */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-lg text-pointColor/70 ml-1">
                  개
                </div>
              </div>
            </div>
          </div>
          {/* dashboard content */}
          <div className="relative tablet:w-[32%] w-full h-fit tablet:pt-[32%] pt-[60%] tablet:mt-0 mt-5 bg-bgColor drop-shadow-md flex flex-col justify-center items-center rounded-md">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center">
              {/* title */}
              <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo4 tablet:text-xl text-lg text-textColor/70">
                지난달 게시글 수
              </div>
              <div className="w-full h-fit flex flex-row justify-center items-end tablet:mt-5 mt-3">
                {/* count */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-4xl text-3xl text-pointColor/70">
                  {previosMonthData.length}
                </div>
                {/* unit */}
                <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-lg text-pointColor/70 ml-1">
                  개
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
