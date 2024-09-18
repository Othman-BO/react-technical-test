import axios from "axios";
import { IssueInfo } from "../types/issue";

export const getApiIssue = async (params: IssueInfo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${params.owner}/${params.repo}/issues/${params.issueNumber}`,
  );
  return response.data;
};
