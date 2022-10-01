// import { DeckGL } from '@deck.gl/react';
// import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { useState } from 'react';
import { Map } from 'react-map-gl';

// const atlGeoJson = [
//   {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Polygon',
//           coordinates: [
//             [
//               [-84.402798500204881, 33.75464936754819],
//               [-84.40418541506223, 33.754692739949228],
//               [-84.412771061149229, 33.754698939783857],
//               [-84.417560163308039, 33.754735761678297],
//               [-84.417532414610946, 33.749179980814375],
//               [-84.41754771430935, 33.745443525213553],
//               [-84.417545750092671, 33.74448645056426],
//               [-84.415348089348271, 33.744449672859126],
//               [-84.41411027452493, 33.744433952672892],
//               [-84.414010001016365, 33.744456139569515],
//               [-84.414017019291876, 33.744322491998012],
//               [-84.414059189962472, 33.741823214431882],
//               [-84.414063488644402, 33.74142393169334],
//               [-84.412330377883379, 33.7413650272429],
//               [-84.411529252031627, 33.741319004819388],
//               [-84.411302182405819, 33.741603693969132],
//               [-84.41060056764357, 33.742150267672294],
//               [-84.409856330737384, 33.74261284187785],
//               [-84.409708174811868, 33.742707861602355],
//               [-84.409067090809245, 33.742973641647808],
//               [-84.408233134952908, 33.743260750355979],
//               [-84.407552972201529, 33.743485832409441],
//               [-84.408357120622114, 33.744366745951439],
//               [-84.408516347686898, 33.744538820861791],
//               [-84.409142037314624, 33.745641703732524],
//               [-84.409688232283813, 33.746758749622359],
//               [-84.410069993340485, 33.747030802494081],
//               [-84.410578282424453, 33.747135889959679],
//               [-84.411086314761818, 33.747150040270888],
//               [-84.411100104732427, 33.749345233601424],
//               [-84.411324646206438, 33.749346507384352],
//               [-84.411320221265683, 33.751263763901228],
//               [-84.409361851205404, 33.75126728579577],
//               [-84.409358057200905, 33.749336646802597],
//               [-84.409208635212508, 33.749222036201878],
//               [-84.409239712501957, 33.748057038234961],
//               [-84.405158055178006, 33.748005060006541],
//               [-84.404528864320611, 33.748898768503899],
//               [-84.404222215575942, 33.749346533124474],
//               [-84.403907954204271, 33.749817879054277],
//               [-84.403635834608622, 33.75023253555397],
//               [-84.403297940305976, 33.750749173001864],
//               [-84.403135655327517, 33.751001411818969],
//               [-84.402937400345962, 33.751311009525246],
//               [-84.402811636057322, 33.752240158633604],
//               [-84.402798500204881, 33.75464936754819]
//             ]
//           ]
//         },
//         properties: { NAME: 'Atlanta University Center' }
//       }
//     ]
//   }
// ];

export function MyMap() {
  const [viewState, setViewState] = useState({
    latitude: 33.749,
    longitude: -84.388,
    zoom: 10,
    bearing: 0,
    pitch: 30
  });
  return (
    <Map
      initialViewState={viewState}
      //style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhwMXdycnkwMXd2M25wYWJhcnRmb3NmIn0.hirmXhYhA1MXl6EKuTYC4w"
    ></Map>
  );
}
