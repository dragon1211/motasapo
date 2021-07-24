import React, { Fragment, useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import '../../../custom.css'
const RegularMap = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(props.latValue),
        lng: Number(props.lngValue),
      }}
      defaultOptions={{
        // scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      }}
      center={{ lat: Number(props.latValue), lng: Number(props.lngValue) }}
    >
      <Marker
        position={{ lat: Number(props.latValue), lng: Number(props.lngValue) }}
        onDragEnd={(e) => {
          props.handleDragEnd(e);
        }}
        draggable={true}
      />
    </GoogleMap>
  ))
);
const GeoLocation = () => {
  return (
    <React.Fragment>
      <div className="row mx-0">
        <div className="col-md-12 px-0">
          <RegularMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `480px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            latValue={35.652832}
            lngValue={139.839478}
          // handleDragEnd={mapDragEnd}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex flex-direction-row p-3">
            <div>
              <img src="/storage/base/top-screen.png" className="gps-image" />
            </div>
            <div className="pl-2">
              <p className="gps-text">Shop.miyama</p>
              <p className="gps-bottom-text">どうもありがとうございました</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex flex-direction-row p-3">
            <div>
              <img src="/storage/base/top-screen.png" className="gps-image" />
            </div>
            <div className="pl-2">
              <p className="gps-text">Shop.miyama</p>
              <p className="gps-bottom-text">どうもありがとうございました</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="d-flex flex-direction-row p-3">
            <div>
              <img src="/storage/base/top-screen.png" className="gps-image" />
            </div>
            <div className="pl-2">
              <p className="gps-text">Shop.miyama</p>
              <p className="gps-bottom-text">どうもありがとうございました</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default GeoLocation