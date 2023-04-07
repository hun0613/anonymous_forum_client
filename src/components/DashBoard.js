import { useRecoilValue } from "recoil";
import { boardListState } from "../atom/atom";
import ChartComp from "./ChartComp";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import useWindowSize from "../hooks/useWindowSize";
import useTransformDateForm from "../hooks/useTransformDateFormat";
import { useState } from "react";

const transformDateForm = (date) => {
  const year = date.getFullYear();
  let month = 0;
  let day = 0;

  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = date.getDate();
  }

  return `${year}-${month}-${day}`;
};

const DashBoard = () => {
  // 날짜 정규표현식
  const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;

  // useState
  const [startDateOfChart, setStartDateOfChart] = useState(
    useTransformDateForm(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000))
  );
  const [endDateOfChart, setEndDateOfChart] = useState(useTransformDateForm(new Date()));

  const [periodSetting, setPeriodSetting] = useState(false); // 기간 설정 컴포넌트 활성화 컨트롤
  const [period, setPeriod] = useState(endDateOfChart);
  const [checkPeriod, setCheckPeriod] = useState(true);

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

  // 화면 가로 사이즈
  const width = useWindowSize();

  const handleClickPreviosBtn = () => {
    setStartDateOfChart(
      transformDateForm(new Date(new Date(startDateOfChart).getTime() - 1 * 24 * 60 * 60 * 1000))
    );
    setEndDateOfChart(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() - 1 * 24 * 60 * 60 * 1000))
    );
    setPeriod(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() - 1 * 24 * 60 * 60 * 1000))
    );
  };

  const handleClickNextBtn = () => {
    setStartDateOfChart(
      transformDateForm(new Date(new Date(startDateOfChart).getTime() + 1 * 24 * 60 * 60 * 1000))
    );
    setEndDateOfChart(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() + 1 * 24 * 60 * 60 * 1000))
    );
    setPeriod(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() + 1 * 24 * 60 * 60 * 1000))
    );
  };

  const handleClickSettingPeriod = () => {
    setPeriodSetting(true);
  };

  const handleClickConfirmSettingPeriod = () => {
    if (checkPeriod) {
      setPeriodSetting(false);
      setStartDateOfChart(
        transformDateForm(new Date(new Date(period).getTime() - 6 * 24 * 60 * 60 * 1000))
      );
      setEndDateOfChart(period);
    }
  };

  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
    if (!checkValidPeriod(e.target.value)) {
      setCheckPeriod(false);
    } else {
      setCheckPeriod(true);
    }
  };

  // 윤년까지 고려하는 날짜 유효성 검증 함수
  const checkValidPeriod = (date) => {
    const splitDate = date.split("-");
    const y = parseInt(splitDate[0], 10);
	  const m = parseInt(splitDate[1], 10);
	  const d = parseInt(splitDate[2], 10);

    if (dateRegex.test(d+'-'+m+'-'+y)){
      return true;
    }else{
      return false;
    }
  }

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
        {/* chart */}
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-xl text-textColor/70 mt-8">
          Chart
        </div>

        {/* 기간 설정파트 */}
        <div
          className={
            periodSetting
              ? "w-full h-[160px] flex flex-col justify-center items-center overflow-hidden mt-3 mb-3 transition-height ease-in-out duration-500"
              : "w-full h-[80px] flex flex-col justify-center items-center overflow-hidden mt-3 mb-3 transition-height ease-in-out duration-500"
          }
        >
          <div
            className={
              periodSetting
                ? "w-full h-full flex flex-col justify-center items-center transition ease-in-out duration-500 -translate-y-20"
                : "w-full h-full flex flex-col justify-center items-center transition ease-in-out duration-500 translate-y-10"
            }
          >
            <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo2 tablet:text-sm text-xs text-textColor">
              {endDateOfChart} 기준 최근 1주일 간 데이터
            </div>
            <button
              className="w-fit h-full flex flex-col justify-center items-center py-1.5 px-4 font-NMSNeo2 tablet:text-xs text-[10px] text-white bg-pointColor hover:bg-pointColor/60 rounded-md mt-3 cursor-pointer"
              onClick={handleClickSettingPeriod}
            >
              기간설정
            </button>
          </div>
          <div
            className={
              periodSetting
                ? "w-full h-full flex flex-col justify-center items-center transition ease-in-out duration-500 -translate-y-7"
                : "w-full h-full flex flex-col justify-center items-center transition ease-in-out duration-500 translate-y-24"
            }
          >
            <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo2 tablet:text-sm text-xs text-pointColor/80">
              yyyy-mm-dd 형식으로 작성해주세요
            </div>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              value={period}
              onChange={handleChangePeriod}
              className="tablet:w-1/5 w-2/3 h-fit py-2 px-3 font-NMSNeo2 tablet:text-base text-sm text-textColor/80 rounded-md drop-shadow-md text-center outline-none mt-4"
            />
            {checkPeriod ? null : (
              <div className="w-fit h-fit flex flex-col justify-center items-center font-NMSNeo2 tablet:text-sm text-xs text-negativeColor/80 mt-4">
                형식이 올바르지 않습니다
              </div>
            )}

            <button
              className="w-fit h-full flex flex-col justify-center items-center py-1.5 px-4 font-NMSNeo2 tablet:text-xs text-[10px] text-white bg-pointColor hover:bg-pointColor/60 rounded-md mt-3 cursor-pointer"
              onClick={handleClickConfirmSettingPeriod}
            >
              확 인
            </button>
          </div>
        </div>

        {width > 790 ? (
          <div className="w-full h-[500px] flex tablet:flex-row flex-col justify-center items-center bg-white rounded-md drop-shadow-md mt-2 p-5">
            <div
              className="w-10 h-8 flex flex-row justify-center items-center bg-pointColor/80 hover:bg-pointColor/30 rounded-md p-1 mr-5 cursor-pointer"
              onClick={handleClickPreviosBtn}
            >
              <IoChevronBackSharp className=" text-2xl text-white" />
            </div>
            <ChartComp startDateProps={startDateOfChart} endDateProps={endDateOfChart} />
            <div
              className="w-10 h-8 flex flex-row justify-center items-center bg-pointColor/80 hover:bg-pointColor/30 rounded-md p-1 ml-5 cursor-pointer"
              onClick={handleClickNextBtn}
            >
              <IoChevronForwardSharp className=" text-2xl text-white" />
            </div>
          </div>
        ) : (
          <div className="w-full h-[500px] flex tablet:flex-row flex-col justify-center items-center bg-white rounded-md drop-shadow-md mt-2 p-5">
            <ChartComp startDateProps={startDateOfChart} endDateProps={endDateOfChart} />
            <div className="w-full h-fit flex flex-row justify-center items-center mt-2 mb-2">
              <button
                className="w-10 h-8 flex flex-row justify-center items-center bg-pointColor/80 rounded-md p-1 mr-5"
                onClick={handleClickPreviosBtn}
              >
                <IoChevronBackSharp className=" text-2xl text-white" />
              </button>
              <button
                className="w-10 h-8 flex flex-row justify-center items-center bg-pointColor/80 rounded-md p-1"
                onClick={handleClickNextBtn}
              >
                <IoChevronForwardSharp className=" text-2xl text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoard;
