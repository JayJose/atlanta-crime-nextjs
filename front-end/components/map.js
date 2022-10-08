import { useRouter } from 'next/router';

import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import neighborhoods from '../data/atlantaNeighborhoods.json';
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
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: 'small',
          pad: 'small'
        }}
      >
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
            mapboxAccessToken={process.env.mapboxAccessToken}
          ></StaticMap>
        </DeckGL>
      </div>
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
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: 'small',
          pad: 'small'
        }}
      >
        <DeckGL
          layers={[jsonLayer, scatterLayer]}
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
            mapboxAccessToken={process.env.mapboxAccessToken}
          ></StaticMap>
        </DeckGL>
      </div>
    </>
  );
}

/** Generate a mega map
 * Display a map of all crimes in Atlanta with outlines by neighborhood
 * Clicking a neighborhood routes the user to a drill down
 */
export function MyMegaMap({ mapData }) {
  mapData.forEach(
    (row) =>
      (row.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)])
  );

  // const myNeighborhood = _.filter(neighborhoods.features, function (row) {
  //   return row.properties.NAME.toLowerCase() === neighborhood;
  // });

  // // TODO save centroids for each object rather than calculating each time
  // var myCentroid = turf.centroid(myNeighborhood[0]);

  // set the initial view state to the middle-ish of Atlanta city proper)
  const [viewState, setViewState] = useState({
    latitude: 33.74,
    longitude: -84.42,
    zoom: 11,
    bearing: 0,
    pitch: 20
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
  const jsonAlpha = 255;
  const jsonLayer = new GeoJsonLayer({
    id: 'neighborhoods-layer',
    data: 'https://raw.githubusercontent.com/JayJose/needs-more-polygons/main/data/atlantaNeighborhoods.json',
    filled: true,
    getFillColor: [0, 0, 0, 0],
    stroked: true,
    getLineWidth: 30,
    getLineColor: [253, 111, 255, jsonAlpha],
    pickable: true,
    autoHighlight: true,
    highlightColor: [253, 111, 255, jsonAlpha]
  });

  const scatterLayer = new ScatterplotLayer({
    id: 'crime-layer',
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

  const hexAlpha = 200;
  const hexLayer = new HexagonLayer({
    id: 'hexagon-layer',
    data: mapData,
    pickable: false,
    extruded: true,
    radius: 200,
    elevationScale: 4,
    getPosition: (d) => d.coordinates,
    // colorbrewer: 4-class greys
    colorRange: [
      [247, 247, 247, hexAlpha],
      [150, 150, 150, hexAlpha],
      [99, 99, 99, hexAlpha],
      [37, 37, 37, hexAlpha]
    ]
  });

  const heatmapLayer = new HeatmapLayer({
    id: 'heatmap-layer',
    data: mapData,
    getPosition: (d) => d.coordinates,
    aggregation: 'SUM'
  });

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          margin: 'small',
          pad: 'small'
        }}
      >
        <DeckGL
          layers={[jsonLayer, hexLayer]}
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
            mapStyle={BASEMAP.POSITRON}
            mapboxAccessToken={process.env.mapboxAccessToken}
          ></StaticMap>
        </DeckGL>
      </div>
    </>
  );
}
