import React from 'react';
import { useSelector } from 'react-redux';

const DistrictInformation = () => {
  const district = useSelector(store => store.district.selected);
  return (
    <div className="w-2/3 pt-20 h-auto">
      <div className="border-l border-gray pl-8 pt-10 pb-10">
        <div className="pb-4 text-lg">{district.district}</div>
        <div className="flex flex-wrap">
          <div className="w-1/2 mb-2">
            <div className="text-sm"> Quarantine </div>
            <div className="text-sm font-bold">
              {district.covid19.quarantine}
            </div>
          </div>
          <div className="w-1/2 mb-2">
            <div className="text-sm"> Confimed cases </div>
            <div className="text-sm font-bold">
              {district.covid19.confirmed}
            </div>
          </div>
          <div className="w-1/2 mb-2">
            <div className="text-sm"> Recovered </div>
            <div className="text-sm font-bold">N/A</div>
          </div>
          <div className="w-1/2 mb-2">
            <div className="text-sm"> Deaths </div>
            <div className="text-sm font-bold">{district.covid19.died}</div>
          </div>
        </div>
      </div>
      {/* <div className="mt-8 text-xs">Citations</div> */}
    </div>
  );
};

export default DistrictInformation;
