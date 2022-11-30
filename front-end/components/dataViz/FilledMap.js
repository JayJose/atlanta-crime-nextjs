import { useRouter } from 'next/router';

import { useState } from 'react';

import StaticMap from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';

import _ from 'underscore';

// COLOR MAP
import * as d3 from 'd3';

export default function FilledMap({
  data,
  setNeighborhood,
  setViewState,
  viewState
}) {
  const router = useRouter();

  let minVal = _.min(data, function (e) {
    return e.crimes;
  });
  let maxVal = _.max(data, function (e) {
    return e.crimes;
  });
  // color scale
  function colorPercents(value) {
    var colorScale = d3
      .scaleSequential(d3.interpolateGreens)
      .domain([minVal.crimes, 500]);
    var col = d3.color(colorScale(value));
    return col;
  }

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      let name = info.object.properties.NAME.toLowerCase();
      router.push('/hoods/' + encodeURIComponent(name));
    }
  };

  // const onHover = (info) => {
  //   info && {
  //     html: `${info.object.properties.NAME}`
  //   };
  // };

  // LAYERS
  const jsonAlpha = 150;
  const gray = 180;
  const jsonLayer = new GeoJsonLayer({
    id: 'neighborhoods-layer',
    data: 'https://raw.githubusercontent.com/JayJose/needs-more-polygons/main/data/atlantaNeighborhoods.json',
    filled: true,
    getFillColor: [0, 0, 0, 0],
    stroked: true,
    getLineWidth: 30,
    getFillColor: (d) => {
      let hood = d.properties.NAME.toLowerCase();
      let obj = data.find((e) => e.neighborhood === hood);

      if (obj !== undefined) {
        let col = colorPercents(obj['crimes']);

        return [col.r, col.g, col.b, 255];
      } else {
        return [0, 0, 0, 244];
      }
    },
    pickable: true,
    autoHighlight: true,
    highlightColor: [111, 255, 176, jsonAlpha],
    onClick: onClick
    // updateTriggers: {
    //   getFillColor: offense
    // }
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
          layers={[jsonLayer]}
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
            mapStyle={BASEMAP.DARK_MATTER}
            mapboxAccessToken={process.env.mapboxAccessToken}
          ></StaticMap>
        </DeckGL>
      </div>
    </>
  );
}
