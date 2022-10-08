import { useRouter } from 'next/router';

import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import neighborhoods from '../data/atlantaNeighborhoods.json';
//import neighborhoods from '../data/alabamaSchools.json';
import * as turf from '@turf/turf';

import _ from 'underscore';

/** Create a map */
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

// NEIGHBORHOOD MAP

export function MyOtherMap({ neighborhood, mapData }) {
  const myNeighborhood = _.filter(neighborhoods.features, function (row) {
    return row.properties.NAME.toLowerCase() === neighborhood;
  });

  // TODO save centroids for each object rather than calculating each time
  var myCentroid = turf.centroid(myNeighborhood[0]);

  const [viewState, setViewState] = useState({
    latitude: myCentroid.geometry.coordinates[1],
    longitude: myCentroid.geometry.coordinates[0],
    zoom: 13.5,
    bearing: 0,
    pitch: 40
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  // const onClick = (info) => {
  //   if (info.object) {
  //     let name = info.object.properties.NAME.toLowerCase();
  //     //TODO logic to associate GeoJSON names with crime data names
  //     router.push(`/neighborhoods/${name}`);
  //   }
  // };

  // LAYERS
  const jsonLayer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: myNeighborhood,
    filled: false,
    stroked: true,
    getLineColor: [253, 111, 255, 220],
    getFillColor: [0, 0, 0, 0],
    getLineWidth: 10,
    pickable: false,
    autoHighlight: true,
    highlightColor: [253, 111, 255, 220]
  });

  const scatterLayer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: mapData,
    pickable: true,
    opacity: 0.75,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 5,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: (d) => d.coordinates,
    getFillColor: (d) => [111, 255, 176],
    getLineColor: (d) => [0, 0, 0]
  });

  const heatmapLayer = new HeatmapLayer({
    id: 'heatmap-layer',
    data: mapData,
    getPosition: (d) => d.coordinates,
    // getWeight: d => d.WEIGHT,
    aggregation: 'SUM'
  });

  return (
    <>
      <DeckGL
        layers={[jsonLayer, heatmapLayer]}
        controller={true}
        initialViewState={viewState}
        onViewStateChange={updateViewState}
        getTooltip={({ object }) =>
          object && {
            html: `${object.offense}`
          }
        }
      >
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
