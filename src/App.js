import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Geocode from 'react-geocode';
import axios from 'axios';

import * as cities from "./data/cities.json";


function Map(){
  Geocode.setApiKey(process.env.REACT_APP_API_KEY);

  const [ selectedCity, setSelectedCity ] = useState(null);
  const [ selectedAQI, setSelectedAQI ] = useState("");

  const handleClick = (e, city) => {
    setSelectedCity(city);
    console.log(city);
    Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
      res => {
        const cityName = res.results[0].address_components[3].long_name;
        const urlCityName = cityName.toLowerCase().split(" ").join("-");

        axios.get(`https://api.waqi.info/feed/${urlCityName}/?token=d2583b4394214a830ffdade2d10b103620d66ee7`)
        .then(response => {
          console.log(response);
          setSelectedAQI(response.data.data.aqi);
        })
        .catch((error) => console.log(error));
      },
      err => {
        console.error(err);
      }
    )
  }

  return (<GoogleMap defaultZoom={10} 
  defaultCenter={{lat:37.550201, lng:-121.980827}}>
    {
      cities.default.map((city, i) => {
        return(
          <Marker
          key={i}
          onClick={e => handleClick(e, city)}
          position={{
            lat:city.latitude,
            lng:city.longitude
          }}/>
        )
      })
    }

    {
      selectedCity && (
        <InfoWindow
        position={{
          lat:selectedCity.latitude,
          lng:selectedCity.longitude
        }}>
          <div>City Details: {selectedAQI} AQI</div>
        </InfoWindow>
      )
    }
  </GoogleMap>);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{width: '100vw', height : '100vh'}}>
      <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`}
      loadingElement = {<div style={{height: "100%"}} />}
      containerElement = {<div style={{height: "100%"}} />}
      mapElement = {<div style={{height: "100%"}} />}
      />
    </div>
  );
}

export default App;
