import { useQuery } from "react-query";
import axios from "axios";

const usePo = () => {
  const fetchPo = async () => {
    try {
      const data = await axios.get("http://localhost:8080/poRequest");

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["poData"], fetchPo, {
    refetchOnWindowFocus: false,
  });
};

export default usePo;
