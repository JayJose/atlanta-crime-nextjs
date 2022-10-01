import { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

import { Map } from 'react-map-gl';
import neighborhoods from '../data/atlantaNeighborhoods.json';
import neighborhoods2 from '../data/City_of_Atlanta_Neighborhood_Statistical_Areas.json';

export function MyMap() {
  const [viewState, setViewState] = useState({
    latitude: 33.749,
    longitude: -84.388,
    zoom: 10,
    bearing: 0,
    pitch: 30
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      alert(`${info.object.properties.NAME}`);
    }
  };

  return (
    <>
      <DeckGL
        controller={true}
        initialViewState={viewState}
        onViewStateChange={updateViewState}
      >
        <GeoJsonLayer
          id="id"
          data={neighborhoods}
          filled={true}
          stroked={true}
          getFillColor={[200, 0, 80, 180]}
          pickable={true}
          autoHighlight={true}
          onClick={onClick}
        />
        <Map
          //style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken="pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhwMXdycnkwMXd2M25wYWJhcnRmb3NmIn0.hirmXhYhA1MXl6EKuTYC4w"
        ></Map>
      </DeckGL>
    </>
  );
}
