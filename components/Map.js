import Router from 'next/router';
import React , { useEffect } from "react";
import { Map as ReactLeafletMap, TileLayer } from 'react-leaflet';

const Map = (props) => {
  const mapRef = React.createRef();

  const handleMoveend = (ev) => {
    const map = mapRef.current;
    if (map == null) {
      return;
    }

    const center = map.leafletElement.getCenter();
    const zoom = map.leafletElement.getZoom();

    Router.replace({ 
      pathname: location.pathname, 
      query:  { 
        ...Router.query,
        lat: center.lat, 
        long: center.lng, 
        zoom: zoom
      }
    });
  };

  useEffect(() => {
    if (Router.query.lat 
      || Router.query.long 
      || Router.query.zoom
    ) {
      return;
    }

    const map = mapRef.current;
    if (map == null) {
      return;
    }

    // some transiion
    const center = map.leafletElement.getCenter();
    map.leafletElement.setView(
      [center.lat, center.lng], 
      map.leafletElement.getZoom() + 2
    );

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        map.leafletElement.setView(
          [coords.latitude, coords.longitude], 
          map.leafletElement.getZoom()
        );
      });
    }
  }, []);

  return (
    <div className="map-box">
      <ReactLeafletMap 
        ref={mapRef}
        center={props.data.center} 
        zoom={props.data.zoom}
        onMoveEnd={handleMoveend}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </ReactLeafletMap>

      <style jsx>{`
        .map-box {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>

      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          background: #333;
        }
      `}</style>
    </div>
  );
}

export default Map;
