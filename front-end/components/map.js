import { useRouter } from 'next/router';

import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';

import { GeoJsonLayer } from '@deck.gl/layers';
import neighborhoods from '../data/atlantaNeighborhoods.json';
//import neighborhoods from '../data/alabamaSchools.json';

export function MyMap() {
  const router = useRouter();

  const [viewState, setViewState] = useState({
    latitude: 33.775981,
    longitude: -84.420527,
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
            html: `${object.properties.NAME}`
          }
        }
      >
        <GeoJsonLayer
          id="id"
          data={neighborhoods}
          filled={true}
          stroked={true}
          getFillColor={[253, 111, 255, 220]}
          getLineColor={[0, 0, 0, 150]}
          getLineWidth={19}
          pickable={true}
          autoHighlight={true}
          highlightColor={[111, 255, 176, 150]}
          onClick={onClick}
        />

        <StaticMap
          reuseMaps
          mapStyle={BASEMAP.DARK_MATTER}
          mapboxAccessToken={
            'pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw'
          }
        ></StaticMap>
      </DeckGL>
    </>
  );
}

export function MyOtherMap() {
  const router = useRouter();

  const [viewState, setViewState] = useState({
    latitude: 33.775981,
    longitude: -84.420527,
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
            html: `${object.properties.NAME}`
          }
        }
      >
        <GeoJsonLayer
          id="id"
          data={neighborhoods}
          filled={true}
          stroked={true}
          getFillColor={[253, 111, 255, 220]}
          getLineColor={[0, 0, 0, 150]}
          getLineWidth={19}
          pickable={true}
          autoHighlight={true}
          highlightColor={[111, 255, 176, 150]}
          onClick={onClick}
        />

        <StaticMap
          reuseMaps
          mapStyle={BASEMAP.DARK_MATTER}
          mapboxAccessToken={
            'pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw'
          }
        ></StaticMap>
      </DeckGL>
    </>
  );
}
