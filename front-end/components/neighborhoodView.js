import { MyResponsiveBar } from './barChart';
import { MyResponsiveHeatMap } from './heatmap';
import { MyResponsiveTreeMap } from './treemap';
import { countByCategory, genHeatmapData } from '../lib/transformData';
import { toTitleCase } from '../lib/transformStrings';
import _ from 'underscore';
import { Box, Heading, Text, Paragraph, Grid } from 'grommet';

import theme from '../styles/theme';

export function NeighborhoodView(props) {
  const margin = 'small';
  const pad = 'small';
  const round = 'small';
  const columns = 'large';
  const rows = 'medium';
  const gap = 'small';

  // var treeMapData = _.map(
  //   _.filter(props.crimes, function (row) {
  //     return row.year == '2022';
  //   }),
  //   function (value, key) {
  //     return {
  //       id: value.neighborhood,
  //       name: value.neighborhood,
  //       value: value.value
  //     };
  //   }
  // );

  return (
    <>
      <Box
        round={round}
        pad={pad}
        direction="column"
        background="background"
        margin={{ top: 'none', bottom: 'none', left: margin }}
      >
        <Heading level="4" color="black" margin={'none'}>
          {toTitleCase(props.id)}
        </Heading>
        <Paragraph size="xsmall" margin="none">
          Did you know... {toTitleCase(props.id)}, Atlanta, Georgia, USA is home
          to 69,420 people?
        </Paragraph>
      </Box>
      <Box direction="column" fill>
        <Grid
          columns={columns}
          rows={rows}
          gap={gap}
          align="start"
          margin={margin}
        >
          <Box fill background={'backgroundCharts'} round={round} pad={pad}>
            <Text size="size">Chart1 title</Text>
            <MyResponsiveTreeMap
              data={{
                name: 'crimes',
                children: countByCategory(props.crimes, 'offense')
              }}
            ></MyResponsiveTreeMap>
          </Box>
          <Box fill background={'backgroundCharts'} round={round} pad={pad}>
            <Text size="size">Chart2 title</Text>
            <MyResponsiveHeatMap
              data={genHeatmapData(props.crimes, 'offense', 'day_name')}
            ></MyResponsiveHeatMap>
          </Box>
          <Box fill background={'backgroundCharts'} round={round} pad={pad}>
            <Text size="size">Chart3 title</Text>
            <MyResponsiveBar
              data={countByCategory(props.crimes, 'offense_category')}
              layout="horizontal"
              color={theme.global.colors.bars}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
