import React from 'react';
import BangadeshMap from '../components/BangladeshMap';
import DistrictInformation from '../components/DistrictInformation';

const LandingPage = () => {
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
