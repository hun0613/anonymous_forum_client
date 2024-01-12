import axios from "axios";

const getChartWeek = (startDate, endDate) => {
  return axios.get(`/chart/week?startDate=${startDate}&endDate=${endDate}`, {
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });
};

export default getChartWeek;
