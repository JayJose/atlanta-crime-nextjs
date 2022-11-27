import { Box } from 'grommet';

export const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    pad={{ left: 'medium', right: 'small', vertical: 'xxxsmall' }}
    elevation="xsmall"
    style={{ zIndex: '1' }}
    {...props}
  />
);
