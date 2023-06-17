import { useQuery } from "react-query";
import axios from "axios";

const useExcess = ({ itemName, itemColor, excessDeliveredDate }) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }

    if (excessDeliveredDate) {
      query.append("excessDeliveredDate", excessDeliveredDate);
    }

    try {
      const data = await axios.get(
        `http://localhost:8080/excess?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["excessData", itemName, itemColor, excessDeliveredDate],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useExcess;
