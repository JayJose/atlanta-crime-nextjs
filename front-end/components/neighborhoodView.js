import { MyResponsiveBar } from './barChart';
import { MyResponsiveHeatMap } from './heatmap';
import { countByCategory, genHeatmapData } from '../lib/transformData';
import { toTitleCase } from '../lib/transformStrings';
import _ from 'underscore';
import { Box, Heading, Text, Paragraph } from 'grommet';

import theme from '../styles/theme';

export function NeighborhoodView(props) {
  const margin = 'small';

  return (
    <>
      <Heading level="4" margin="small" color="royalblue">
        {toTitleCase(props.id)}
      </Heading>
      <Paragraph size="xsmall" margin={margin}>
        Did you know... {toTitleCase(props.id)}, Atlanta, Georgia, USA is home
        to 69,420 people?
      </Paragraph>
      <Box direction="column" fill margin={margin}>
        <Text size="size">Crimes by Offense Category</Text>
        <MyResponsiveBar
          data={countByCategory(props.crimes, 'offense_category')}
          layout="horizontal"
          color={theme.global.colors.bars}
        />
        <MyResponsiveHeatMap
          data={genHeatmapData(props.crimes, 'offense', 'day_name')}
        />
      </Box>
    </>
  );
}
