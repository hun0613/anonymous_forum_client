import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useWindowSize from "../hooks/useWindowSize";
import useGetChartWeek from "../hooks/useGetChartWeek";
import { useEffect } from "react";

const ChartComp = (props) => {
  const width = useWindowSize();

  // react-query
  const { refetch, data } = useGetChartWeek(props.startDateProps, props.endDateProps);

  // 최근 1주일 날짜별 게시글 수 배열
  let seriesData = data?.data.map((el) => el.cnt);
  let maxIdx = seriesData?.indexOf(Math.max(...seriesData));

  // 가장 큰 데이터만 노란색 처리
  let resultData = seriesData?.map((el, idx) => {
    if (idx === maxIdx) {
      return {
        y: el,
        color: "#F8C100",
      };
    } else {
      return {
        y: el,
        color: "#557AFD",
      };
    }
  });

  // 최근 1주일 날짜 배열 생성 로직
  let dateArr = data?.data.map((el) => {
    return new Date(el.createDate).getDate() + "일";
  });

  useEffect(() => {
    refetch();
  }, [props.startDateProps]);

  // 7일 전 날짜
  const startDate = new Date(data?.data[0].createDate).toLocaleDateString();
  // // 현재 날짜
  const endDate = new Date(data?.data[data?.data.length - 1].createDate).toLocaleDateString();

  const options = {
    chart: {
      type: "column",
      style: {
        fontFamily: "NMSNeo3",
      },
      width: width > 790 ? 500 : 300,
    },
    title: {
      text: "주간 게시글 등록 현황",
      style: {
        fontSize: width > 790 ? 20 : 16,
      },
      margin: 60,
    },
    subtitle: {
      text: `${startDate} ~ ${endDate}`,
    },
    xAxis: {
      categories: dateArr,
      title: {
        text: null,
        // margin : 10,
        // align: "high"
      },
    },
    yAxis: {
      min: 0,
      max: 50,
      tickInterval: 10,
      title: {
        text: null,
      },
      plotLines: [
        {
          color: "#FF4D62",
          value: (seriesData?.reduce((a, b) => a + b) / seriesData?.length).toFixed(2), // 소수점 2자리
          width: 2,
          dashStyle: "ShortDot",
          zIndex: 4,
        },
      ],
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "등록게시글 수",
        data: resultData,
      },
    ],
    legend: {
      enabled: true,
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default ChartComp;
