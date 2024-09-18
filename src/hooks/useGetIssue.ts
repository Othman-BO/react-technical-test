import { useQuery } from "@tanstack/react-query";

import { IssueInfo } from "../types/issue";
import { getApiIssue } from "../api/getApiIssue";

export const useGetIssue = (params: IssueInfo, enabled: boolean = true) =>
  useQuery({
    queryKey: ["issue", params.issueNumber, params.owner, params.repo],
    queryFn: () => getApiIssue(params),
    enabled,
  });
