import { Box } from "grommet";

export function MyLayout({ chart }) {
  return (
    <Box
      background="white"
      direction="column"
      elevation="xsmall"
      height="medium"
      width="medium"
    >
      {chart}
    </Box>
  );
}
