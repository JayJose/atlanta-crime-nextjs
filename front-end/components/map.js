import { useRouter } from 'next/router';

import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import neighborhoods from '../data/atlantaNeighborhoods.json';
import centroids from '../data/atlantaNeighborhoodCentroids.json';

import _ from 'underscore';

/**Create a neighborhood-specific map */
export function MyNeighborhoodMap({ neighborhood, data }) {
  const myNeighborhood = _.filter(neighborhoods.features, function (row) {
    return row.properties.NAME.toLowerCase() === neighborhood;
  });

  let myCentroid = centroids[neighborhood];
  const [viewState, setViewState] = useState({
    latitude: parseFloat(myCentroid[1]),
    longitude: parseFloat(myCentroid[0]),
    zoom: 13.5,
    bearing: 0,
    pitch: 40
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

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
    data: data,
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
    data: data,
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

/** Generate a map of Atlanta
 * Display a map of all crimes in Atlanta with outlines by neighborhood
 * Clicking a neighborhood routes the user to a drill down
 */
export function MyCityMap({ data, setNeighborhood, setViewState, viewState }) {
  const router = useRouter();

  data.forEach(
    (row) =>
      (row.coordinates = [parseFloat(row.longitude), parseFloat(row.latitude)])
  );

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      let name = info.object.properties.NAME.toLowerCase();
      //TODO logic to associate GeoJSON names with crime data names
      //router.push(`/neighborhoods/${name}`);
      let myCentroid = centroids[name];
      setViewState({
        latitude: parseFloat(myCentroid[1]),
        longitude: parseFloat(myCentroid[0]),
        zoom: 12.5,
        bearing: 0,
        pitch: 20
      });
      setNeighborhood([name]);
    }
  };

  const onHover = (info) => {
    info && {
      html: `${info.object.properties.NAME}`
    };
  };

  // LAYERS
  const jsonAlpha = 150;
  const jsonLayer = new GeoJsonLayer({
    id: 'neighborhoods-layer',
    data: 'https://raw.githubusercontent.com/JayJose/needs-more-polygons/main/data/atlantaNeighborhoods.json',
    filled: true,
    getFillColor: [0, 0, 0, 0],
    stroked: true,
    getLineWidth: 30,
    getLineColor: [0, 0, 0, jsonAlpha],
    pickable: true,
    autoHighlight: true,
    highlightColor: [253, 111, 255, jsonAlpha],
    onClick: onClick
  });

  const scatterLayer = new ScatterplotLayer({
    id: 'crime-layer',
    data: data,
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

  const hexAlpha = 150;
  const hexLayer = new HexagonLayer({
    id: 'hexagon-layer',
    data: data,
    pickable: false,
    extruded: true,
    radius: 150,
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
    data: data,
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
          margin: 'large',
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
              html: `${object.properties.NAME}`
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
