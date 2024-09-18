import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "../chatBubble";
import { useGetIssue } from "../../hooks/useGetIssue";
import { useIssueStore } from "../../store/issueStore";
import { CircularProgress } from "@mui/joy";
import { useGetComment } from "../../hooks/useGetComment";

export default function MessagesPane() {
  const { issueInfo, commentsFiltredByUser } = useIssueStore();

  const { isFetched, data: issue } = useGetIssue(issueInfo, true);
  const { data: comments } = useGetComment(issue?.comments_url);

  const filtredCommentsByUser = () => {
    return comments?.filter((ele: any) => !commentsFiltredByUser.find((t) => t === ele?.user?.id));
  };

  const getStatus = (state: string) => {
    if (state === "closed")
      return (
        <Typography level="title-md" sx={{ color: "red" }}>
          Fermée
        </Typography>
      );
    else if (state === "open")
      return (
        <Typography level="title-md" sx={{ color: "green" }}>
          Ouverte
        </Typography>
      );
  };

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue?.number}
              </Chip>
            }
          >
            {issue.title}
          </Typography>
          <Typography level="body-sm">{issue.user.login}</Typography>

          <Typography level="body-sm">Statut : {getStatus(issue.state)}</Typography>
        </Stack>
      )}
      {!isFetched && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <CircularProgress />{" "}
        </Stack>
      )}
      {comments && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue!} />
          {filtredCommentsByUser().map((comment: any) => (
            <ChatBubble
              key={comment?.id}
              variant={comment?.user?.login === issue?.user?.login ? "solid" : "outlined"}
              {...comment}
            />
          ))}
        </Stack>
      )}
      {comments?.length < 1 && (
        <Typography level="h4" sx={{ padding: 2 }}>
          Aucun commentaire
        </Typography>
      )}
    </Sheet>
  );
}
