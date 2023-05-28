import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteRequest = ({ requestId }) => {
  const QueryClient = useQueryClient();
  const deleteRequestItem = `http://localhost:8080/purchaseOrder/${requestId}`;

  return useMutation(
    (obj) =>
      axios
        .delete(deleteRequestItem, JSON.stringify(obj))
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

export default useDeleteRequest;
