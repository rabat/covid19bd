import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { feature, mesh } from 'topojson-client';
import { geoMercator, geoPath, min, max, scaleLinear } from 'd3';

import { setSelectedDistrict } from '../store/district';
import bd from '../bd.topo.json';

const features = feature(bd, bd.objects.collection);
const meshes = mesh(bd, bd.objects.collection);
const projection = geoMercator()
  .center([91.2, 24.8])
  .scale(6500);

const pathGenerator = geoPath().projection(projection);

const Districts = () => {
  const districts = useSelector(store => store.district.all);
  const colorScale = scaleLinear()
    .domain([
      min(districts.map(d => d.covid19.quarantine)),
      max(districts.map(d => d.covid19.quarantine))
    ])
    .range(['#f1f1f1', '#f8cc2c']);

  return features.features.map((d, index) => {
    const key = 'district-' + index;
    const fillColor = colorScale(districts[index].covid19.quarantine);
    return (
      <path
        key={key}
        fill={fillColor}
        d={pathGenerator(d)}
        className="district"
      />
    );
  });
};

const Covid19 = () => {
  const dispatch = useDispatch();
  const districts = useSelector(store => store.district.all);

  const onClick = useCallback(
    async data => {
      await dispatch(setSelectedDistrict(data));
    },
    [dispatch]
  );

  return districts.map(({ district, long, lat }, idx) => {
    const key = 'covid19-data-' + idx;
    const [px, py] = projection([long, lat]);

    const circleScale = scaleLinear()
      .domain([
        min(districts.map(d => d.covid19.confirmed)),
        max(districts.map(d => d.covid19.confirmed))
      ])
      .range([10, 20]);

    let patientCircleRadius = 0;
    let deathCircleRadius = 0;
    let patientCount = districts[idx].covid19.confirmed;
    let deathCount = districts[idx].covid19.died;

    deathCircleRadius =
      deathCount > 0 ? circleScale(deathCount) - 2 : deathCount;
    patientCircleRadius =
      patientCount > 0 ? circleScale(patientCount) : patientCircleRadius;

    return (
      <g
        key={key}
        style={{ transform: `translate(${px}px, ${py}px)` }}
        className="district-label"
        onClick={() => onClick(districts[idx])}
      >
        <text x="-16" y="8">
          {district}
        </text>
        <circle
          className="confirmed-circle"
          cx="2"
          cy="4"
          r={patientCircleRadius}
        />
        <circle
          className="passed-away-circle"
          cx="3"
          cy="2"
          r={deathCircleRadius}
        />
      </g>
    );
  });
};

const BangladeshMap = () => {
  return (
    <svg className="w-full bd-map">
      <path className="district-border" d={pathGenerator(meshes)}></path>
      <Districts />
      <Covid19 />
    </svg>
  );
};

export default BangladeshMap;
