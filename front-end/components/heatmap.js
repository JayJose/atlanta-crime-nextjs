import { ResponsiveHeatMap } from '@nivo/heatmap';

export function MyResponsiveHeatMap({ data }) {
  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 25, right: 20, bottom: 60, left: 200 }}
      valueFormat=">-.0s"
      axisTop={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 46
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: -72
      }}
      colors={{
        type: 'sequential',
        scheme: 'blue_purple',
        divergeAt: 0.5
      }}
      emptyColor="#555555"
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: 'Crimes →',
          titleAlign: 'start',
          titleOffset: 4
        }
      ]}
    />
  );
}
