import { useQuery } from "react-query";
import axios from "axios";

const useColors = () => {
  const fetchColors = async () => {
    try {
      const data = await axios.get("http://localhost:8080/itemColors");
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["itemColors"], fetchColors, {
    refetchOnWindowFocus: false,
  });
};

export default useColors;
