import React from 'react';
import BangadeshMap from '../components/BangladeshMap';
import DistrictInformation from '../components/DistrictInformation';

const LandingPage = () => {
  fetch(
    'https://www.thedailystar.net/coronavirus-in-bangladesh-3-new-cases-detected-dghs-1882915'
  )
    .then(response => response.text())
    .then(console.log);

  return (
    <div className="flex flex-wrap ">
      <div className="w-6/12 text-left h-auto overflow-hidden">
        <BangadeshMap />
      </div>

      <div className="w-6/12 flex justify-center ">
        <DistrictInformation />
      </div>
    </div>
  );
};

export default LandingPage;
