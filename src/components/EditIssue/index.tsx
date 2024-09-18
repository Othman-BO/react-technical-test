import { FC, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
// import { useGetTimeline } from "../../hooks/useGetTimeLines";
import { useIssueStore } from "../../store/issueStore";
import { IssueInfo } from "../../types/issue";
import { FormControl, FormLabel, Input } from "@mui/joy";

const EditIssue: FC = () => {
  const [outcome, setOutcome] = useState<IssueInfo>({
    owner: "facebook",
    issueNumber: "7901",
    repo: "react",
  });
  const { setIssueInfo } = useIssueStore();

  useEffect(() => {
    setIssueInfo(outcome);
  }, [outcome]);

  return (
    <Box>
      <h2>Changer d'issue : </h2>
      <form>
        <FormControl>
          <FormLabel>Propriétaire du dépôt</FormLabel>
          <Input
            id="standard-basic"
            value={outcome.owner}
            onChange={(e) => setOutcome({ ...outcome, owner: e.target.value })}
            disabled
          />
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <FormLabel>Nom du dépôt</FormLabel>
          <Input
            id="repo"
            value={outcome.repo}
            onChange={(e) => setOutcome({ ...outcome, repo: e.target.value })}
            disabled
          />
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <FormLabel>Numéro de l'issue</FormLabel>
          <Input
            type="number"
            id="issue-number"
            value={outcome.issueNumber}
            onChange={(e) => setOutcome({ ...outcome, issueNumber: e.target.value })}
          />
        </FormControl>
      </form>
    </Box>
  );
};

export default EditIssue;
