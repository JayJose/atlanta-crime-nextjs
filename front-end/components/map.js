import { useRouter } from 'next/router';
import { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

import { Tip } from 'grommet';
import { Map } from 'react-map-gl';
import neighborhoods from '../data/atlantaNeighborhoods.json';

export function MyMap() {
  const router = useRouter();

  const [viewState, setViewState] = useState({
    latitude: 33.754033,
    longitude: -84.40155, //
    zoom: 11,
    bearing: 0,
    pitch: 20
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      let name = info.object.properties.NAME.toLowerCase();
      //TODO logic to associate GeoJSON names with crime data names
      router.push(`/neighborhoods/${name}`);
    }
  };

  return (
    <>
      <DeckGL
        controller={true}
        initialViewState={viewState}
        onViewStateChange={updateViewState}
        getTooltip={({ object }) =>
          object && {
            html: `<Tip>${object.properties.NAME}</Tip>`
          }
        }
      >
        <GeoJsonLayer
          id="id"
          data={neighborhoods}
          filled={true}
          stroked={true}
          getFillColor={[253, 111, 255, 180]}
          getLineColor={[0, 0, 0, 190]}
          getLineWidth={5}
          getLineWi
          pickable={true}
          autoHighlight={true}
          highlightColor={[111, 255, 176, 150]}
          onClick={onClick}
        />
        <Map
          //style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken="pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhwMXdycnkwMXd2M25wYWJhcnRmb3NmIn0.hirmXhYhA1MXl6EKuTYC4w"
        ></Map>
      </DeckGL>
    </>
  );
}
