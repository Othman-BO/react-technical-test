import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { Checkbox, CircularProgress } from "@mui/joy";
import { useGetComment } from "../../hooks/useGetComment";
import { useGetIssue } from "../../hooks/useGetIssue";
import { useIssueStore } from "../../store/issueStore";
import { Comment, User } from "../../types/issue";
import { FormControlLabel, FormGroup } from "@mui/material";

const Users = () => {
  const { issueInfo, setCommentsFiltredByUser, commentsFiltredByUser } = useIssueStore();

  const { isFetched, data: issue } = useGetIssue(issueInfo, true);
  const { data: comments } = useGetComment(issue?.comments_url);

  const users = comments?.map((comment: Comment) => {
    return {
      ...comment.user,
      commentsNbr: comments?.filter((item: any) => item?.user?.id === comment?.user?.id)?.length || "0",
    };
  });

  const getUsers = users?.reduce((acc: User[], user: User) => {
    if (!acc.find((t2) => t2.id === user.id)) {
      acc.push(user);
    }
    return acc;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setCommentsFiltredByUser([...commentsFiltredByUser, Number(event.target.id)]);
    } else {
      setCommentsFiltredByUser(commentsFiltredByUser.filter((ele) => ele !== Number(event.target.id)));
    }
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
      {!isFetched && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <CircularProgress />{" "}
        </Stack>
      )}

      <FormGroup sx={{ padding: 2 }}>
        <Typography gutterBottom sx={{ fontWeight: "bold" }}>
          Les utilisateurs :
        </Typography>
        {getUsers?.map((user: User) => (
          <FormControlLabel
            key={user.id}
            control={
              <Checkbox
                defaultChecked
                onChange={handleChange}
                id={user.id?.toString()}
                style={{ color: "#8dc6ff", padding: 10 }}
              />
            }
            label={
              <Typography level="body-xs" fontWeight="bold">
                {user.login} : {user.commentsNbr}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </Sheet>
  );
};

export default Users;
