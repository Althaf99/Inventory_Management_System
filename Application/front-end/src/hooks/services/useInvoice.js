import { useQuery } from "react-query";
import axios from "axios";

const useInvoice = ({
  itemName,
  itemColor,
  requestNumber,
  requestDate,
  invoiceNo,
  invoiceDate,
}) => {
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
    if (requestDate) {
      query.append("poDate", requestDate);
    }
    if (invoiceNo) {
      query.append("invoiceNo", invoiceNo);
    }
    if (invoiceDate) {
      query.append("invoiceDate", invoiceDate);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/invoiceList?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    [
      "invoiceData",
      itemName,
      itemColor,
      requestNumber,
      invoiceNo,
      requestDate,
      invoiceDate,
    ],
    fetchRequest,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useInvoice;
