import { useRecoilValue } from "recoil";
import { boardListState } from "../atom/atom";
import ChartComp from "./ChartComp";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import useWindowSize from "../hooks/useWindowSize";
import useTransformDateForm from "../hooks/useTransformDateFormat";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  // useState
  const [startDateOfChart, setStartDateOfChart] = useState(
    useTransformDateForm(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000))
  );
  const [endDateOfChart, setEndDateOfChart] = useState(useTransformDateForm(new Date()));

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
      transformDateForm(new Date(new Date(startDateOfChart).getTime() - 6 * 24 * 60 * 60 * 1000))
    );
    setEndDateOfChart(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() - 6 * 24 * 60 * 60 * 1000))
    );
  };

  const handleClickNextBtn = () => {
    setStartDateOfChart(
      transformDateForm(new Date(new Date(startDateOfChart).getTime() + 6 * 24 * 60 * 60 * 1000))
    );
    setEndDateOfChart(
      transformDateForm(new Date(new Date(endDateOfChart).getTime() + 6 * 24 * 60 * 60 * 1000))
    );
  };

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
        <div className="w-full h-fit flex flex-col justify-center items-center font-NMSNeo5 tablet:text-2xl text-xl text-textColor/70 mt-8 mb-2">
          Chart
        </div>
        {width > 790 ? (
          <div className="w-full h-[500px] flex tablet:flex-row flex-col justify-center items-center bg-white rounded-md drop-shadow-md mt-5 p-5">
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
          <div className="w-full h-[500px] flex tablet:flex-row flex-col justify-center items-center bg-white rounded-md drop-shadow-md mt-5 p-5">
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
