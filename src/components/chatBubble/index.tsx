import { Avatar } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { getDatePublished } from "../../utils";
import { useState } from "react";

type ChatBubbleProps = {
  body: string;
  variant: "solid" | "outlined";
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
};

export default function ChatBubble({ body, variant, created_at, user }: ChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const amountOfWords = 100;
  const splittedText = body.split(" ");
  const itCanOverflow = splittedText?.length > amountOfWords;
  const beginText = itCanOverflow ? splittedText.slice(0, amountOfWords - 1).join(" ") : body;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  return (
    <Stack direction="row" spacing={2}>
      <Avatar size="sm" variant="solid" src={user?.avatar_url} />
      <Box>
        <Stack direction="row" spacing={2} sx={{ mb: 0.25 }}>
          <Typography level="body-xs" fontWeight="bold">
            {user?.login}
          </Typography>
          <Typography level="body-xs">{getDatePublished(created_at)}</Typography>
        </Stack>
        <Box>
          <Sheet
            color="primary"
            variant={variant}
            invertedColors={variant === "solid"}
            sx={{
              p: 1.25,
              borderRadius: "lg",
              borderTopLeftRadius: 0,
            }}
          >
            <Typography level="body-sm" color="primary">
              {beginText}
              {itCanOverflow && (
                <>
                  {!isExpanded && <span>... </span>}
                  {isExpanded && (
                    <span className={`${!isExpanded && "hidden"}`} aria-hidden={!isExpanded}>
                      {endText}
                    </span>
                  )}
                  <br />
                  <span
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    <Typography
                      level="body-sm"
                      color="primary"
                      sx={{ color: "#000000", cursor: "pointer", fontWeight: "bold" }}
                    >
                      {isExpanded ? "Lire moins" : "Lire plus"}
                    </Typography>
                  </span>
                </>
              )}
            </Typography>
          </Sheet>
        </Box>
      </Box>
    </Stack>
  );
}
