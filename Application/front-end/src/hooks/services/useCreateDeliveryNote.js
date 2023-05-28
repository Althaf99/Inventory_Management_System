import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateDeliveryNote = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/deliveryNote";

  return useMutation(
    async (obj) => await axios.post(url, obj),
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

export default useCreateDeliveryNote;
