import { ResponsiveLine } from '@nivo/line';
import { toTitleCase } from '../lib/transformStrings';

const theme = {
  theme: {
    fontSize: '10px',
    textColor: 'white'
  }
};

export function MyResponsiveLine({ data, y_label = 'Crimes' }) {
  data[0]['color'] = 'gray';
  data[1]['color'] = '#6FFFB0';

  return (
    <ResponsiveLine
      theme={theme.theme}
      data={data}
      height="200"
      margin={{ top: 40, right: 75, bottom: 50, left: 50 }}
      xScale={{
        type: 'linear',
        min: 1
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
        tickPadding: 10,
        tickRotation: 0,
        legend: toTitleCase(y_label),
        legendOffset: -40,
        legendPosition: 'middle',
        format: (e) => Math.floor(e) === e && e
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
