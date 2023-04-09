import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreatePost = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://localhost:3000/api/v1/PORequests";

  return useMutation(
    (obj) => axios.post(projectUrl, JSON.stringify(obj)).then((x) => x.json()),
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

export default useCreatePost;
