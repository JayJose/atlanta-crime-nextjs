import { MyResponsiveBar } from './barChart';
import { MyResponsiveHeatMap } from './heatmap';
import { countByCategory } from '../lib/transformData';
import { Box, Heading } from 'grommet';

import theme from '../styles/theme';

export function NeighborhoodView(props) {
  //something here
  return (
    <>
      <Heading level="4" margin="small">
        Drilldown for {props.id}
      </Heading>
      <MyResponsiveBar
        data={countByCategory(props.crimes, 'offense')}
        layout="horizontal"
        color={theme.global.colors.bars2}
      />
      <MyResponsiveHeatMap></MyResponsiveHeatMap>
    </>
  );
}
