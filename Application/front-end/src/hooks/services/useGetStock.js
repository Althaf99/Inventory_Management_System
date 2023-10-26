import { useQuery } from "react-query";
import axios from "axios";

const useGetStock = (isUpdated) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/stock`);

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["stockData", isUpdated], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useGetStock;
