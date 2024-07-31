import React, { useEffect, useState } from 'react';
import KAKAO_MAP_APP_KEY from '@/constant/constant';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address: string;
}

function Map({ address }: MapProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.56785, 126.9888),
          level: 4,
        };
        const map = new kakao.maps.Map(container, options);

        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            
            const markerPosition = coords;
            const marker = new kakao.maps.Marker({
              map,
              position: markerPosition,
            });
            marker.setMap(map);

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[0].road_address.building_name}</div>`,
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
            setLoading(false);
          }
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  return (
    <div className='relative w-full'>
      <div
        id='map'
        className='relative w-full h-full rounded-[1.6rem]
        lg:w-full lg:h-[45rem]  
        md:w-full md:h-[27.6rem] 
      '
      />
      {loading && <p className='absolute text-[2rem]'>카카오 지도 불러오는중...</p>}
    </div>
  );
}

export default Map;
