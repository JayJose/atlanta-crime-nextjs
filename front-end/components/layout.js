import { Box, Grommet } from "grommet";
import theme from "../styles/theme";

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

export const Layout = () => {
  return (
    <Grommet theme={theme}>
      <AppBar>Crime!</AppBar>
    </Grommet>
  );
};
