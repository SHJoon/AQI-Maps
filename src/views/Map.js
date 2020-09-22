import React, { useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Geocode from 'react-geocode';
import axios from 'axios';

const Map = (props) => {
    const { allStations, setAllStations } = props;
    
    // Geocode.setApiKey(process.env.REACT_APP_API_KEY);
    
    const [ selectedCity, setSelectedCity ] = useState(null);
    const [ infoStyle, setInfoStyle ] = useState({});

    const handleClick = (city) => {
        setSelectedCity(city);

        if (city.aqi > 70) {
            setInfoStyle({
                color:"white",
                backgroundColor:"red"
            })
        }
        else if (city.aqi > 50) {
            setInfoStyle({
                color:"white",
                backgroundColor:"orange"
            })
        }
        else if (city.aqi > 30) {
            setInfoStyle({
                color:"black",
                backgroundColor:"yellow"
            })
        }
        else {
            setInfoStyle({
                color:"white",
                backgroundColor:"green"
            })
        }
    }

    return (<GoogleMap defaultZoom={10} 
    defaultCenter={{lat:37.550201, lng:-121.980827}}>
      {
        allStations.map((city, i) => {
          return(
            <Marker
            key={i}
            onClick={e => handleClick(city)}
            position={{
              lat:city.lat,
              lng:city.lon
            }}/>
          )
        })
      }

      {
        selectedCity && (
            <div>
            <InfoWindow
            style={infoStyle}
            position={{
                lat:selectedCity.lat,
                lng:selectedCity.lon
            }}>
                <div>
                    <h2>City Details</h2>
                    <p>AQI = {selectedCity.aqi}</p>
                </div>
            </InfoWindow>
          </div>
        )
      }
    </GoogleMap>);
}

export default Map;