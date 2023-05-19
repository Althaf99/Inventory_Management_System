import { useQuery } from "react-query";
import axios from "axios";

const useRequest = ({ itemName, itemColor, requestNumber }) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
    if (requestNumber) {
      query.append("po", requestNumber);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/purchaseOrder?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["requestData", itemName, itemColor, requestNumber],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useRequest;
