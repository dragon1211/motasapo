import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { PersonData } from "./personInfo";

type Props = {
    markers: Array<PersonData>
}

//---------------------------------------------------------------------------------------
export const Map : React.FC<Props> = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHsb5vqLqXP2n-CszQ8HO8czTlPw7Vhcw" // Add your API key
  });
  return isLoaded ? <MyMap markers={props.markers}/> : null;
}
//------------------------------------------------------------------------------------------
const MyMap:React.FC<Props> = (props)=>{

  const [activeMarker, setActiveMarker] = useState(null);
  const markers = props.markers;

  const handleActiveMarker = (marker:any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map:any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}>
        {
       
        markers.map(({ id, name, type, position }) => {
          var image;
          switch(type)
          {
             case "male": image = '/storage/base/icon-pin-blue.png'; break;
             case "female": image = '/storage/base/icon-pin-red.png'; break;
             case "user": {image = '/storage/base/icon-pin-black.png';} break;
             case "shop": image = '/storage/base/icon-shop.png'; break;
             default: return;
          }
          return(
            <Marker
                key={id}
                position={position}
                icon={image}
                onClick={() => handleActiveMarker(id)}>
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>{name}</div>
                  </InfoWindow>
                ) : null}
            </Marker>
          )
      })}
    </GoogleMap>
  );
}

