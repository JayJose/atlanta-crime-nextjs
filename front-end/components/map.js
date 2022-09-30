// import React from 'react';
// import { ResponsiveChoropleth } from '@nivo/geo';
// import neighborhoods from '../data/atl.json';
// import countries from '../data/countries.json';
// const data = [
//   {
//     id: 'USA',
//     value: 69
//   }
// ];

// neighborhoods.features.forEach((e, i) => {
//   neighborhoods.features[i]['id'] = e.properties['NAME'];
// });

// var scale = 500;
// var translation = [scale/]

// const MyResponsiveChoropleth = ({ data }) => (
//   <ResponsiveChoropleth
//     data={data}
//     features={neighborhoods.features}
//     margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
//     colors="nivo"
//     domain={[0, 1000]}
//     unknownColor="#666666"
//     label="properties.name"
//     valueFormat=".2s"
//     enableGraticule={true}
//     graticuleLineColor="#dddddd"
//     borderWidth={0.5}
//     borderColor="#152538"
//     projectionScale={500}
//     projectionTranslation={[1.5, 1]}
//   />
// );

// export function MyMap() {
//   return (
//     <div style={{ width: 800, height: 600 }}>
//       <MyResponsiveChoropleth data={data} />
//     </div>
//   );
// }
