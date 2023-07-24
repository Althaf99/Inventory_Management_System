import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

const useUpdateRepair = ({ repairId }) => {
  const QueryClient = useQueryClient();
  const useURL = `http://localhost:8080/repair/${repairId}`;

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

export default useUpdateRepair;
