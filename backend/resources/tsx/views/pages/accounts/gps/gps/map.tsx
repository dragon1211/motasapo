import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { PersonData } from "./personInfo";
import { NavItem } from "react-bootstrap";

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
    markers.forEach(({ location }) => bounds.extend(location));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}>
        {
       
        markers.map(({ name, account_type, sex,post_id, is_current_user, location }, id) => {
          var image;
          if(post_id < 0){
             image = '/storage/base/icon-pin-black.png';
          }
          else {
              if(account_type == 'shop'){
                image = '/storage/base/icon-shop.png'; 
              }
              else if(account_type == 'user'){
                  switch(sex)
                  {
                    case "male": image = '/storage/base/icon-pin-blue.png'; break;
                    case "female": image = '/storage/base/icon-pin-red.png'; break;
                    default: return;
                  }
              }
              else image = '';
              
              if(is_current_user)  image = '/storage/base/icon-pin-black.png';
          }

          return(
            <Marker
                key={id}
                position={location}
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

