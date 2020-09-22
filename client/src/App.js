import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios';
import {Map} from './components/maps';


function App({ mapProps }) {
  const [AQIStations, setAQIStations] = useState([]);

  useEffect(() => {
    axios.get("https://api.waqi.info/map/bounds/?token=d2583b4394214a830ffdade2d10b103620d66ee7&latlng=24.846565,-65.960261,48.987427,-124.732715")
    .then(response => {
      // console.log(response.data.data);
      setAQIStations(response.data.data);
    })
    .catch((error) => console.log(error));
  }, [])
  console.log("AQIStations:",AQIStations);
  
  const addMarkers = links => map => {
    links.forEach((link, index) => {
      var position = new window.google.maps.LatLng(link.lat, link.lon);
      const marker = new window.google.maps.Marker({
        map,
        position: position,
        // label: "test label",
        title: link.station.name,
        id: index + 1
      });

      const infoStr = 
      `<div>
        <h4>${link.station.name}</h4>
        <p>AQI: ${link.aqi}</p>
        <p>Last Updated: ${link.station.time}</p>
      </div>`

      const infobubble = new window.google.maps.InfoWindow({
        content: infoStr
      });
      marker.addListener(`click`, () => {
        infobubble.open(map, marker);
      });
    });
  };

  mapProps = {
    options: { center: {lat:37.550201, lng:-121.980827}, zoom: 10 },
    onMount: addMarkers(AQIStations)
  };

  //NOT WORKING PROPERLY
  const markerClickHandler = (id, marker) => {
    alert("clicked");
    window.google.maps.event.trigger(id, "click");
  };

  return (
    <div className='App'>
      <Map {...mapProps}/>
      {/* {AQIStations.map((marker, i) => {
          
          return (
            <li
              // ON CLICK TO TRIGGER MARKER
              onClick={() => markerClickHandler(i)}
              style={{
                margin: "1vmin",
                borderBottom: "1px solid gray",
                cursor: "pointer"
              }}
              key={marker.id}
            >
              {marker.name}
            </li> */}
          {/* );
        })} */}
    </div>
  );
}

export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
