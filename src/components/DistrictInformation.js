import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// only work for news portals allow 'Access-Control-Allow-Origin'
const parseCitationPageMetaTag = async url => {
  const html = await fetch(url).then(response => response.text());
  const re = /<meta\s*(?:property|name)=("?(?:og|twitter):(\w*)).*\scontent="(.*)"/g;

  let meta = {};
  let match = null;

  while ((match = re.exec(html))) {
    const [, , key, value] = match;
    if (key && value) {
      meta = { ...meta, [key]: value };
    }
  }

  return meta;
};

const DistrictInformation = () => {
  const district = useSelector(store => store.district.selected);
  const [citations, setCitations] = useState([]);

  useEffect(() => {
    setCitations([]);

    const getCitation = async () => {
      const citations = await Promise.all(
        district.citations.map(url => parseCitationPageMetaTag(url))
      );
      setCitations(citations);
    };

    getCitation();
  }, [district]);

  return (
    <div className="w-2/3 pt-20 h-auto">
      <div className="border-l border-gray pl-8 pt-10 pb-10">
        <div className="pb-4 text-lg">{district.district}</div>
        <div className="flex flex-wrap">
          <div className="w-1/2 mb-2">
            <div class="bg-yellow w-4 h-3 mr-2 inline-block"></div>
            <div className="text-sm inline-block"> Quarantine </div>
            <div className="text-sm font-bold">
              {district.covid19.quarantine}
            </div>
          </div>
          <div className="w-1/2 mb-2">
            <div class="bg-orrange w-4 h-3 mr-2 inline-block"></div>
            <div className="text-sm inline-block"> Confimed cases </div>
            <div className="text-sm font-bold">
              {district.covid19.confirmed}
            </div>
          </div>
          <div className="w-1/2 mb-2">
            <div class="bg-green w-4 h-3 mr-2 inline-block"></div>
            <div className="text-sm inline-block"> Recovered </div>
            <div className="text-sm font-bold">N/A</div>
          </div>
          <div className="w-1/2 mb-2">
            <div class="bg-red w-4 h-3 mr-2 inline-block"></div>
            <div className="text-sm inline-block"> Deaths </div>
            <div className="text-sm font-bold">{district.covid19.died}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs pb-2">Citations</div>
      <div className="pb-2 text-xs">
        <a
          href="http://103.247.238.81/webportal/pages/covid19.php"
          target="_blank"
        >
          <span className="pr-2">Data source</span>
          <span>HEOC & Control Room, IEDCR, DHIS2</span>
        </a>
      </div>

      {citations.map((cite, idx) => {
        let key = 'cite-' + idx;
        return (
          <div className="text-xs" key={key}>
            <a href={cite.url} target="_blank">
              <span>
                <span className="pr-2">{idx + 1}</span>
                <span className="italic">
                  {cite.title} [<span>{cite.site_name}</span>]
                </span>
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default DistrictInformation;
