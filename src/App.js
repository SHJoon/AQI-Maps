import React, { useEffect, useState } from 'react';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Geocode from 'react-geocode';
import axios from 'axios';

import * as cities from "./data/cities.json";
import Map from './views/Map';


function App() {
  const [ allStations, setAllStations ] = useState([]);
  
  useEffect(() => axios.get(`https://api.waqi.info/map/bounds/?token=d2583b4394214a830ffdade2d10b103620d66ee7&latlng=24.846565,-65.960261,48.987427,-124.732715`)
  .then(res => {
    setAllStations(res.data.data);
  })
  .catch(err => console.error(err)), []);
  
  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{width: '100vw', height : '100vh'}}>
      <WrappedMap
      allStations = {allStations}
      setAllStations = {setAllStations}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`}
      loadingElement = {<div style={{height: "100%"}} />}
      containerElement = {<div style={{height: "100%"}} />}
      mapElement = {<div style={{height: "100%"}} />}
      />
    </div>
  );
}

export default App;
