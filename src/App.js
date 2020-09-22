import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios';
import {Map} from './components/maps';


function App({ mapProps }) {
  const [AQIStations1, setAQIStations] = useState();

  useEffect(() => {
    axios.get("https://api.waqi.info/map/bounds/?token=d2583b4394214a830ffdade2d10b103620d66ee7&latlng=24.846565,-65.960261,48.987427,-124.732715")
    .then(response => {
      // console.log(response.data.data);
      setAQIStations(response.data.data);
    })
    .catch((error) => console.log(error));
  }, [])
  console.log("AQIStations1:",AQIStations1);
  var AQIStations= [
    {
    lat: 44.657014,
    lon: -111.089618,
    uid: 7529,
    aqi: "21",
    station: {
    name: "West Yellowstone Park Ent #2, Montana, USA",
    time: "2020-09-21T19:00:00-07:00"
    }
    },
    {
    lat: 40.733501,
    lon: -111.871696,
    uid: 4469,
    aqi: "68",
    station: {
    name: "Salt Lake City, Utah",
    time: "2020-09-21T20:00:00-06:00"
    }
    },
    {
    lat: 44.150528,
    lon: -77.3955,
    uid: 1,
    aqi: "25",
    station: {
    name: "Belleville, Ontario, Canada",
    time: "2020-09-21T22:00:00-05:00"
    }
    },
    {
    lat: 37.1314,
    lon: -86.1481,
    uid: 7411,
    aqi: "22",
    station: {
    name: "Mammoth Cave NP, Kentucky, USA",
    time: "2020-09-21T20:00:00-05:00"
    }
    },
    {
    lat: 39.758235,
    lon: -84.197375,
    uid: 7463,
    aqi: "29",
    station: {
    name: "Dayton - Sinclair, Ohio, USA",
    time: "2020-09-21T20:00:00-05:00"
    }
    }]

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
      const infowindow = new window.google.maps.InfoWindow({
        content: link.name
      });
      marker.addListener(`click`, () => {
        infowindow.open(map, marker);
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
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);