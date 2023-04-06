import { useQuery } from "@tanstack/react-query";
import getChartWeek from "../api/getChartWeek";

const useGetChartWeek = (startDate, endDate) => {
  return useQuery(["chartWeek"], () => getChartWeek(startDate, endDate), {
    refetchOnWindowFocus: false,
  });
};

export default useGetChartWeek;
