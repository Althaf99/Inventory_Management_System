import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteRepair = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteRepair = `http://localhost:8080/repair/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRepair, JSON.stringify(obj)).then((x) => x.json()),
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

export default useDeleteRepair;
