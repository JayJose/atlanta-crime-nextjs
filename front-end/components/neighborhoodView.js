import { MyResponsiveHeatMap } from './heatmap';
import { MyResponsiveTreeMap } from './treemap';
import { MyResponsiveRadar } from './radar';
import { MyResponsiveBars } from './bars';
import { MyOtherMap } from './map';
import { countByCategory, genHeatmapData } from '../lib/transformData';
import { toTitleCase, formatNumbers } from '../lib/transformStrings';
import _ from 'underscore';
import { Box, Heading, Text, Paragraph, Grid } from 'grommet';

import theme from '../styles/theme';

export function NeighborhoodView(props) {
  // box config
  const elevation = 'xsmall';
  const margin = 'small';
  const pad = 'small';
  const round = 'small';

  // grid config
  const columns = 'large';
  const rows = 'large';
  const gap = 'small';

  // data trans

  // total crimes by year
  var years = [2021, 2022];
  var totalCrimes = {};
  for (let i = 0; i < years.length; i++) {
    totalCrimes[years[i]] = _.chain(props.crimes)
      .filter(function (row) {
        return row.year == years[i];
      })
      .reduce((s, f) => s + parseInt(f.value), 0)
      .value();
  }

  var yoy_change = (100 * (totalCrimes[2022] / totalCrimes[2021] - 1)).toFixed(
    1
  );

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
        background={'backgroundCharts'}
        margin={{ top: 'none', bottom: 'none', left: margin, right: margin }}
        elevation={elevation}
      >
        <Heading level="4" color="black" margin={'none'}>
          {toTitleCase(props.id)}
        </Heading>
        <Paragraph size="xsmall" margin="none">
          Did you know... that {formatNumbers(totalCrimes[2022])} crimes have
          occurred in {toTitleCase(props.id)} in 2022! That's a{' '}
          {Math.abs(yoy_change)}% {yoy_change > 0 ? 'increase' : 'decrease'} vs.
          2021.
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
          <Box
            fill
            background={'backgroundCharts'}
            round={round}
            pad={pad}
            elevation={elevation}
          >
            <Text size="size">Total offenses by year</Text>
            <MyResponsiveBars data={props.bar} />
          </Box>
          <Box
            fill
            background={'backgroundCharts'}
            round={round}
            pad={pad}
            elevation={elevation}
          >
            <Text size="size">Localized crime map</Text>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                margin: margin,
                pad: margin
              }}
            >
              <MyOtherMap neighborhood={props.id} />
            </div>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
