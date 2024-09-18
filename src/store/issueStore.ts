import { create } from "zustand";
import { IssueInfo } from "../types/issue";

interface IssueStore {
  issueInfo: IssueInfo;
  setIssueInfo: (issue: IssueInfo) => void;
  commentsFiltredByUser: number[];
  setCommentsFiltredByUser: (issue: number[]) => void;
}

export const useIssueStore = create<IssueStore>((set) => ({
  issueInfo: { owner: "facebook", repo: "react", issueNumber: "7501" },
  commentsFiltredByUser: [],
  setIssueInfo: (issueInfo: IssueInfo) => set({ issueInfo }),
  setCommentsFiltredByUser: (commentsFiltredByUser: number[]) => set({ commentsFiltredByUser }),
}));
