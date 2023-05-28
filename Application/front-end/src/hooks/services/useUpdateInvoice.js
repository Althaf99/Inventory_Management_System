import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

const useUpdateInvoice = ({ id }) => {
  const QueryClient = useQueryClient();
  const useURL = `http://localhost:8080/invoice/${id}`;

  return useMutation(
    (obj) => axios.put(useURL, JSON.stringify(obj)).then((x) => x.json()),
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

export default useUpdateInvoice;
