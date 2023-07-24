import { useQuery } from "react-query";
import axios from "axios";

const useGetEmployee = () => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/employee`);

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["employeeData"], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useGetEmployee;
