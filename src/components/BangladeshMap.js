import React from 'react';
import { feature, mesh } from 'topojson-client';
import { geoMercator, geoPath, scaleLinear } from 'd3-geo';

import bd from '../bd.topo.json';
import districts from '../districts.json';

const features = feature(bd, bd.objects.collection);
const meshes = mesh(bd, bd.objects.collection);

const BangladeshMap = () => {
  const projection = geoMercator()
    .center([91.2, 24.8])
    .scale(6100);

  const pathGenerator = geoPath().projection(projection);

  return (
    <svg className="w-full h-full">
      <path fill="#EAEAEA" d={pathGenerator(features)}></path>
      <path fill="none" stroke="#DDD" d={pathGenerator(meshes)}></path>$
      {districts.map(({ district, long, lat }, idx) => {
        const [px, py] = projection([long, lat]);
        const labelStyle = {
          fontSize: '10px',
          transform: `translate(${px}px, ${py}px)`
        };
        return (
          <text key={idx} style={labelStyle} x="-16" y="8">
            {district}
          </text>
        );
      })}
    </svg>
  );
};

export default BangladeshMap;
