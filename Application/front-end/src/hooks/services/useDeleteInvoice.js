import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteInvoice = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteInvoiceItem = `http://localhost:8080/invoice/${id}`;

  return useMutation(
    (obj) =>
      axios
        .delete(deleteInvoiceItem, JSON.stringify(obj))
        .then((x) => x.json()),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries();
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useDeleteInvoice;
