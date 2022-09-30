import { ResponsiveHeatMap } from '@nivo/heatmap';

const data = [
  {
    id: 'Japan',
    data: [
      {
        x: 'Train',
        y: 67379
      },
      {
        x: 'Subway',
        y: -90809
      },
      {
        x: 'Bus',
        y: -2625
      },
      {
        x: 'Car',
        y: 22432
      },
      {
        x: 'Boat',
        y: 13212
      },
      {
        x: 'Moto',
        y: 55473
      },
      {
        x: 'Moped',
        y: 23248
      },
      {
        x: 'Bicycle',
        y: -51880
      },
      {
        x: 'Others',
        y: 34520
      }
    ]
  },
  {
    id: 'France',
    data: [
      {
        x: 'Train',
        y: 11117
      },
      {
        x: 'Subway',
        y: 36940
      },
      {
        x: 'Bus',
        y: -94054
      },
      {
        x: 'Car',
        y: 49008
      },
      {
        x: 'Boat',
        y: 69849
      },
      {
        x: 'Moto',
        y: 21771
      },
      {
        x: 'Moped',
        y: -80631
      },
      {
        x: 'Bicycle',
        y: -24903
      },
      {
        x: 'Others',
        y: -57501
      }
    ]
  },
  {
    id: 'US',
    data: [
      {
        x: 'Train',
        y: -70695
      },
      {
        x: 'Subway',
        y: -94900
      },
      {
        x: 'Bus',
        y: -1467
      },
      {
        x: 'Car',
        y: 12554
      },
      {
        x: 'Boat',
        y: 7798
      },
      {
        x: 'Moto',
        y: -23222
      },
      {
        x: 'Moped',
        y: 47576
      },
      {
        x: 'Bicycle',
        y: -29584
      },
      {
        x: 'Others',
        y: 1830
      }
    ]
  },
  {
    id: 'Germany',
    data: [
      {
        x: 'Train',
        y: 62794
      },
      {
        x: 'Subway',
        y: -78580
      },
      {
        x: 'Bus',
        y: -62494
      },
      {
        x: 'Car',
        y: 66414
      },
      {
        x: 'Boat',
        y: -88778
      },
      {
        x: 'Moto',
        y: -47358
      },
      {
        x: 'Moped',
        y: 58522
      },
      {
        x: 'Bicycle',
        y: 78324
      },
      {
        x: 'Others',
        y: -32700
      }
    ]
  },
  {
    id: 'Norway',
    data: [
      {
        x: 'Train',
        y: -65566
      },
      {
        x: 'Subway',
        y: -30111
      },
      {
        x: 'Bus',
        y: -13861
      },
      {
        x: 'Car',
        y: 60699
      },
      {
        x: 'Boat',
        y: 40122
      },
      {
        x: 'Moto',
        y: -11571
      },
      {
        x: 'Moped',
        y: -27996
      },
      {
        x: 'Bicycle',
        y: -10028
      },
      {
        x: 'Others',
        y: -20895
      }
    ]
  },
  {
    id: 'Iceland',
    data: [
      {
        x: 'Train',
        y: -22769
      },
      {
        x: 'Subway',
        y: -96399
      },
      {
        x: 'Bus',
        y: -21633
      },
      {
        x: 'Car',
        y: -97149
      },
      {
        x: 'Boat',
        y: -3142
      },
      {
        x: 'Moto',
        y: 51658
      },
      {
        x: 'Moped',
        y: -69679
      },
      {
        x: 'Bicycle',
        y: 78524
      },
      {
        x: 'Others',
        y: -9105
      }
    ]
  },
  {
    id: 'UK',
    data: [
      {
        x: 'Train',
        y: 82460
      },
      {
        x: 'Subway',
        y: -35696
      },
      {
        x: 'Bus',
        y: 77348
      },
      {
        x: 'Car',
        y: 89082
      },
      {
        x: 'Boat',
        y: -60901
      },
      {
        x: 'Moto',
        y: -18259
      },
      {
        x: 'Moped',
        y: 4675
      },
      {
        x: 'Bicycle',
        y: 41280
      },
      {
        x: 'Others',
        y: 55290
      }
    ]
  },
  {
    id: 'Vietnam',
    data: [
      {
        x: 'Train',
        y: -30402
      },
      {
        x: 'Subway',
        y: 77693
      },
      {
        x: 'Bus',
        y: -65559
      },
      {
        x: 'Car',
        y: 47344
      },
      {
        x: 'Boat',
        y: -68363
      },
      {
        x: 'Moto',
        y: -16397
      },
      {
        x: 'Moped',
        y: 89215
      },
      {
        x: 'Bicycle',
        y: 89230
      },
      {
        x: 'Others',
        y: 83079
      }
    ]
  }
];

// id: 'offense',
//     data: [
//       {
//         x: 'monday',
//         y: 100
//       },

export const MyResponsiveHeatMap = () => (
  <ResponsiveHeatMap
    data={data}
    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
    height={350}
    valueFormat=">-.2s"
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -90,
      legend: '',
      legendOffset: 46
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Offense',
      legendPosition: 'middle',
      legendOffset: -72
    }}
    colors={{
      type: 'diverging',
      scheme: 'red_yellow_blue',
      divergeAt: 0.5,
      minValue: -100000,
      maxValue: 100000
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
