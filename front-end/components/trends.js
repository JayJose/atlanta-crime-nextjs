import { ResponsiveLine } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export function MyResponsiveLine({ data, y_label = 'Crimes' }) {
  data[0]['color'] = 'gray';
  data[1]['color'] = '#6FFFB0';

  return (
    <ResponsiveLine
      data={data}
      height="200"
      margin={{ top: 40, right: 40, bottom: 50, left: 60 }}
      xScale={{
        type: 'linear',
        min: 1,
        max: 35 // fix this
      }}
      yScale={{
        type: 'linear'
        // min: 'auto',
        // max: 'auto'
      }}
      colors={(d) => d.color}
      yFormat=" >-.0f"
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Week',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: y_label,
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={0}
      pointBorderWidth={1}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableGridX={false}
      enableGridY={false}
      legends={[
        {
          anchor: 'top-left',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -30,
          itemsSpacing: -30,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 1,
          itemTextColor: 'white',
          symbolSize: 10,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
}
