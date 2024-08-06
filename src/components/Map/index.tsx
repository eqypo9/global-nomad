import React, { useEffect, useState } from 'react';
import KAKAO_MAP_APP_KEY from '@/constant/constant';

/* eslint-disable */
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
  const [infoWindowContent, setInfoWindowContent] = useState('건물명 없음');

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

            const buildingName = result[0].road_address?.building_name || '건물명 없음';

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;font-size:14px;text-align:center;padding:6px 0;border-color:#000000;">${buildingName}</div>`,
            });
            infowindow.open(map, marker);

            map.setCenter(coords);
            setLoading(false);
          } else {
            setInfoWindowContent('주소를 찾을 수 없습니다');
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
      <div id='map' className='w-full h-[45rem] rounded-2xl xl:h-[45rem] lg:h-[27.6rem] md:h-[45rem]' />
      {loading && <p className='absolute text-[2rem]'>카카오 지도 불러오는중...</p>}
    </div>
  );
}

export default Map;
/* eslint-enable */
