import axios from "axios";

const getChartWeek = (startDate, endDate) => {
  return axios.get(`/chart/week?startDate=${startDate}&endDate=${endDate}`, {
    baseURL: "http://192.168.20.65:8080",
  });
};

export default getChartWeek;
