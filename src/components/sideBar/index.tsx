import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import EditIssue from "../EditIssue";
import { useIssueStore } from "../../store/issueStore";
import Users from "../users";

export default function Sidebar() {
  const { issueInfo } = useIssueStore();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Input value={`facebook/react/issues/${issueInfo?.issueNumber}`} />
      <EditIssue />
      <Users />
    </Sheet>
  );
}
