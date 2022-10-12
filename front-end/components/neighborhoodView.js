import { MyResponsiveHeatMap } from './heatmap';
import { MyResponsiveTreeMap } from './treemap';
import { MyResponsiveRadar } from './radar';
import { MyResponsiveBars } from './bars';
import { MyNeighborhoodMap } from './map';
import { countByCategory, genHeatmapData } from '../lib/transformData';
import { toTitleCase, formatNumbers } from '../lib/transformStrings';
import _ from 'underscore';
import { Box, Heading, Text, Tip, Paragraph, Grid } from 'grommet';
import { CircleInformation } from 'grommet-icons';

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
  var myCounts = _.countBy(props.crimes, 'year');

  var currentCount = myCounts[years.current] ?? 0;
  var priorCount = myCounts[years.prior] ?? 0;

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
        {/* TODO use switch statement to help build text */}
        <Paragraph size="xsmall" margin="none">
          Did you know... that {formatNumbers(currentCount)} crimes{' '}
          {currentCount === 1 ? 'has ' : 'have '}
          occurred in {toTitleCase(props.id)} in {years.current}! That is a{' '}
          {Math.abs(yoy_change)}%{' '}
          <span style={{ fontWeight: yoy_change > 0 ? 'bold' : 'normal' }}>
            {yoy_change > 0 ? 'increase' : 'decrease'}{' '}
          </span>
          compared to {years.prior}.
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
            <Box
              direction="row"
              align="center"
              justify="between"
              margin={{ bottom: 'xsmall' }}
            >
              <Text size="size">
                A map of crimes occuring in {toTitleCase(props.id)}, Atlanta in{' '}
                {years.current}.
              </Text>
              <Tip content="Additional information here.">
                <CircleInformation color="black" size="medium" />
              </Tip>
            </Box>
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
