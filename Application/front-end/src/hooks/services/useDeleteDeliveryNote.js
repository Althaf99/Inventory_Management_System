import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletDeliveryNote = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteDeliveryNoteItem = `http://localhost:8080/deliveryNote/${id}`;

  return useMutation(
    (obj) =>
      axios
        .delete(deleteDeliveryNoteItem, JSON.stringify(obj))
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

export default useDeletDeliveryNote;
