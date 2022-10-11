import { MyResponsiveHeatMap } from './heatmap';
import { MyResponsiveTreeMap } from './treemap';
import { MyResponsiveRadar } from './radar';
import { MyResponsiveBars } from './bars';
import { MyNeighborhoodMap } from './map';
import { countByCategory, genHeatmapData } from '../lib/transformData';
import { toTitleCase, formatNumbers } from '../lib/transformStrings';
import _ from 'underscore';
import { Box, Heading, Text, Paragraph, Grid } from 'grommet';

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

  // add coordinate array
  props.crimes.forEach(
    (row) =>
      (row.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)])
  );

  // total crimes by year
  var years = { current: 2022, prior: 2021 };
  var myCounts = countByCategory(props.crimes, 'year');
  //TODO handle missing values
  var currentCount = myCounts.find((e) => e.id == years.current)['value'];
  var priorCount = myCounts.find((e) => e.id == years.prior)['value'];

  var yoy_change = 100 * (currentCount / priorCount - 1).toFixed(2);

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
          Did you know... that {formatNumbers(currentCount)} crimes have
          occurred in {toTitleCase(props.id)} in {years.current}! That's a{' '}
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
          {/* <Box
            fill
            background={'backgroundCharts'}
            round={round}
            pad={pad}
            elevation={elevation}
          >
            <Text size="size">Total offenses by year</Text>
            <MyResponsiveBars data={props.bar} />
          </Box> */}
          <Box
            fill
            background={'backgroundCharts'}
            round={round}
            pad={pad}
            elevation={elevation}
          >
            <Text size="size" margin={{ bottom: 'xxsmall' }}>
              A map of crimes occuring in {toTitleCase(props.id)}, Atlanta in{' '}
              {years.current}.
            </Text>
            <MyNeighborhoodMap
              neighborhood={props.id}
              mapData={_.filter(props.crimes, function (row) {
                return row.year === years.current;
              })}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
