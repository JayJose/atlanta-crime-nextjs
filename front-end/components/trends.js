import { ResponsiveLine } from '@nivo/line';
import { toTitleCase } from '../lib/transformStrings';
import { getYoyChange } from '../lib/transformStrings';

const theme = {
  theme: {
    fontSize: 10,
    textColor: 'white',
    axis: {
      domain: {
        line: {
          //stroke: '#777777',
          strokeWidth: 1
        }
      },
      legend: {
        text: {
          fontSize: 11
        }
      },
      ticks: {
        line: {
          stroke: '#777777',
          strokeWidth: 0
        },
        text: {
          fontSize: 10,
          fill: 'white'
        }
      }
    },
    legends: {
      text: {
        fontSize: 12
      }
    },
    tooltip: {
      container: {
        background: '#ffffff',
        color: '#333333',
        fontSize: 11
      }
    }
  }
};

export function MyResponsiveLine({ data, y_label = 'Crimes' }) {
  data[0]['color'] = 'gray';
  data[1]['color'] = '#6FFFB0';

  return (
    <ResponsiveLine
      theme={theme.theme}
      data={data}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        var pts = slice.points.map((point) => point.data.y);
        console.log(pts);
        return (
          <div
            style={{
              background: 'black',
              padding: '9px 12px',
              border: '1px solid #ccc'
            }}
          >
            <div>Week {slice.points[0].data.x}</div>
            {slice.points.map((point) => {
              return (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0'
                  }}
                >
                  {point.serieId}: {point.data.yFormatted}
                </div>
              );
            })}
            <div>{getYoyChange(pts[1], pts[0])}</div>
          </div>
        );
      }}
      margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
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
        legendOffset: -20,
        legendPosition: 'middle',
        format: () => ''
        // format: (e) => Math.floor(e) === e && e
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
          translateY: -20,
          itemsSpacing: -30,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 1,
          itemTextColor: 'white',
          symbolSize: 7,
          symbolShape: 'square',
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
