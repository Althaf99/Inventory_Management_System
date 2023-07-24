import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateStock = () => {
  const QueryClient = useQueryClient();
  const repairUrl = "http://localhost:8080/stock";

  return useMutation(
    async (obj) => await axios.post(repairUrl, obj),
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

export default useCreateStock;
