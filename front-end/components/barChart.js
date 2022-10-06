// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar';

export function MyOldResponsiveBar({
  data,
  layout = 'vertical',
  color = 'black'
}) {
  if (!data) {
    return null;
  }
  data.sort((a, b) => a.value - b.value);

  return (
    <ResponsiveBar
      data={data}
      layout={layout}
      indexBy={data.id}
      margin={{ top: 5, right: 100, bottom: 50, left: 180 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={color}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'crimes',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 15,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]]
      }}
      role="application"
    />
  );
}
