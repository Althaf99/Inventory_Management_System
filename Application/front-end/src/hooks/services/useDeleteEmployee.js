import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteEmployee = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteEmployee = `http://localhost:8080/employee/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteEmployee, JSON.stringify(obj)).then((x) => x.json()),
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

export default useDeleteEmployee;
