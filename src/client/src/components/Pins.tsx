import * as React from 'react';
import { Marker } from 'react-map-gl';
import geocoder from '../api/geocoder';
var d3 = require('d3-geo');

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const R = 6378137.0; // radius of Earth in meters
const projection = d3.geoAlbersUsa().translate([0, 0]).scale(R);
const projectionMercartor = d3.geoMercator().translate([0, 0]).scale(R);

function convertToAlbers(city) {
  const location = geocoder.getLocation(city.headquarterCity);
  location.then((resp) => {
    const converted = projectionMercartor.invert(
      projection([resp.lng, resp.lat])
    );
    const newlng = converted[0];
    const newlat = converted[1];
    city.newlng = newlng;
    city.newlat = newlat;
    return city;
  });
}

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { onClick, data } = props;
  return (
    data
      //.map((city) => convertToAlbers(city))
      .map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.newlng}
          latitude={city.newlat}
        >
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
              cursor: 'pointer',
              fill: '#ffff',
              stroke: 'none',
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
            onClick={() => onClick(city.organizationName)}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      ))
  );
}
export default Pins;
