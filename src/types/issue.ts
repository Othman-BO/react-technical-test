export type IssueInfo = {
  owner: string;
  repo: string;
  issueNumber: string;
};

export type User = {
  id: string;
  login: string;
  avatar_url: string;
  commentsNbr: string;
};

export type Issue = {
  id: number;
  created_at: string;
  user: User;

  number: number;
  title: string;
  body: string;
  comments_url: string;
};

export type Comment = {
  id: number;
  created_at: string;
  user: User;

  body: string;
  commentsNbr: string;
};
