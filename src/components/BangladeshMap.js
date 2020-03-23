import React from 'react';
import { feature, mesh } from 'topojson-client';
// import { select, path } from 'd3';
import { geoMercator, geoPath, scaleLinear } from 'd3-geo';

import bd from '../bd.topo.json';
import { districts } from '../districts.json';

const features = feature(bd, bd.objects.collection);
const meshes = mesh(bd, bd.objects.collection);

const BangladeshMap = () => {
  const projection = geoMercator()
    .center([91.2, 24.8])
    .scale(5800);

  const pathGenerator = geoPath().projection(projection);

  // console.log(districts);
  // console.log(features);

  const dist = features.features.map(p => {
    const districtName = p.properties.DISTNAME;

    const x = districts.find(d => {
      return d.name.toLowerCase() === districtName.toLowerCase();
    });

    console.log(districtName, x);

    return {
      districtName
    };
  });

  // console.log(dist);

  return (
    <svg className="w-full h-full">
      <path fill="#EAEAEA" d={pathGenerator(features)}></path>
      <path fill="none" stroke="#DDD" d={pathGenerator(meshes)}></path>
    </svg>
  );

  // ====================================

  // const svgRef = useRef();

  // const holderRef = useRef();

  //   console.log(mapData);
  //   console.log(features);

  //   const projection = geoMercator();
  //   const pathGenerator = geoPath().projection(projection);

  // useEffect(() => {
  //   console.log(features);

  //   const svg = select(svgRef.current);

  //   const projection = geoMercator();
  //   projection.center([91.2, 24.8]);
  //   projection.scale(6500);
  //   projection.rotate(0, 0, 0);

  //   const pathGenerator = geoPath().projection(projection);

  //   svg
  //     .selectAll('.city')
  //     .data(features.features)
  //     .join('path')
  //     .attr('class', 'city')
  //     .attr('d', feature => {
  //       console.log(feature);
  //       return pathGenerator(feature);
  //     });
  // }, [mapData]);

  //
};

export default BangladeshMap;
