import { useQuery } from "react-query";
import axios from "axios";

const useGetRepair = (isUpdated) => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/repair`);

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["repairData", isUpdated], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useGetRepair;
