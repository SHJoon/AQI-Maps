import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios';
import {Map} from './components/maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';

// this is for login registration
import { Link, navigate, Router } from "@reach/router";
import LogReg from "./views/LogReg";
import UserList from "./views/UserList";


function App({ mapProps }) {

  // this is for login registration
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        {
          // need to send the cookie in request so server can clear it
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
      })
      .catch(console.log);

    navigate("/");
  };

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

  const addAQIStyle = (aqi) => {
    const hValue = 120 - Math.floor(aqi * 0.8);
    const sValue = "100%";
    const lValue = "50%";

    return `hsl(${hValue},${sValue},${lValue})`
  }

  const addMarkers = links => map => {
    const markerList = [];
    links.forEach((link, index) => {
      if (link.station.name.slice(link.station.name.length-6) !== "Mexico" && link.station.name.slice(link.station.name.length-6) !== "Canada"&& link.station.name.slice(link.station.name.length-8) !== "Saguenay") {
        var position = new window.google.maps.LatLng(link.lat, link.lon);
        const marker = new window.google.maps.Marker({
          map,
          position: position,
          // label: "test label",
          title: link.station.name,
          id: index + 1
        });

        markerList.push(marker);

        let infoStyle = `background-color:${addAQIStyle(link.aqi)}`;
        if (parseInt(link.aqi) > 250) {
          infoStyle = `background-color:purple`;
        }
        if (parseInt(link.aqi) > 100) {
          infoStyle += `;color:white`;
        }

        let infoStr =
        `<div style="${infoStyle}">
          <h3 style="${infoStyle}">${link.station.name}</h3>
          <p>Air Quality Index: ${link.aqi}</p>
          <p>Last Updated: ${link.station.time}</p>
        </div>`;
        const infowindow = new window.google.maps.InfoWindow({
          content: infoStr
        });
        marker.addListener(`click`, () => {
          infowindow.open(map, marker);
        });
        
      }
    });
    var markerCluster = new MarkerClusterer(map, markerList,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
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

      {/* this is for login registration */}
      {/* <div className="jumbotron">
        <h1>MERN Users</h1>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>
      <Router>
        <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/" />
        <UserList path="/users" />
      </Router>
      <div className="container">
        <Link to="/users">Get Users List</Link>
      </div> */}


    </div>
  );
}

export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
