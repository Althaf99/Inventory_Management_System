import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateRepair = () => {
  const QueryClient = useQueryClient();
  const repairUrl = "http://localhost:8080/repair";

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

export default useCreateRepair;
