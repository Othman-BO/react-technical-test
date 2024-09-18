import { useQuery } from "@tanstack/react-query";

import { getApiComments } from "../api/getApiComments";

export const useGetComment = (url: string) =>
  useQuery({
    queryKey: ["comments", url],
    queryFn: () => getApiComments(url),
  });
