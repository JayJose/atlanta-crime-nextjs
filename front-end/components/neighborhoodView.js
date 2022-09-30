import { MyResponsiveBar } from './barChart';
import { MyResponsiveHeatMap } from './heatmap';
import { countByCategory } from '../lib/transformData';
import { Box, Heading, Text } from 'grommet';

import theme from '../styles/theme';

export function NeighborhoodView(props) {
  //something here
  return (
    <>
      <Heading level="4" margin="small">
        Drilldown for {props.id}
      </Heading>
      <Box direction="column" fill margin={'small'} pad={0}>
        <Text size="size">Crimes by Offense Category</Text>
        <MyResponsiveBar
          data={countByCategory(props.crimes, 'offense_category')}
          layout="horizontal"
          color={theme.global.colors.bars}
        />
      </Box>
      <MyResponsiveHeatMap></MyResponsiveHeatMap>
    </>
  );
}
