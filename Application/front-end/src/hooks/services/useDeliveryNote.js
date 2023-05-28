import { useQuery } from "react-query";
import axios from "axios";

const useDeliveryNote = ({ itemName, itemColor, deliveryDate }) => {
  const fetchDeliveryNote = async () => {
    const query = new URLSearchParams();
    if (itemName) {
      query.append("itemName", itemName);
    }
    if (itemColor) {
      query.append("itemColor", itemColor);
    }
    if (deliveryDate) {
      query.append("deliveryDate", deliveryDate);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/deliveryNote?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["deliveryNoteData", itemName, itemColor, deliveryDate],
    fetchDeliveryNote,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useDeliveryNote;
