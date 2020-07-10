import * as React from 'react';
import { render } from 'react-dom';
import useSWR from 'swr';
import { syncWithStorage } from 'swr-sync-storage';

function getCurrentPosition() {
  return new Promise<Pick<Coordinates, 'latitude' | 'longitude'>>(
    (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        reject
      );
    }
  );
}

function Location() {
  const { data } = useSWR<Pick<Coordinates, 'latitude' | 'longitude'>>(
    'geolocation',
    getCurrentPosition
  );

  if (!data) return <p>Reading current location</p>;

  return (
    <p>
      You are located on {data.latitude} {data.longitude}
    </p>
  );
}

// Before rendering, sync SWR cache with sessionStorage
// This will read current values, and start saving new ones
syncWithStorage('session');

render(<Location />, document.querySelector('#root'));
