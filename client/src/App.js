import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
import './App.css';
import axios from 'axios';
import {Map} from './components/maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import SearchBox from "./components/SearchBox"

// this is for login registration
// import { Link, navigate, Router } from "@reach/router";
// import LogReg from "./views/LogReg";
// import UserList from "./views/UserList";


function App({ mapProps }) {

  // this is for login registration
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const logout = () => {
  //   axios
  //     .post(
  //       "http://localhost:8000/api/logout",
  //       {},
  //       {
  //         // need to send the cookie in request so server can clear it
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setIsLoggedIn(false);
  //     })
  //     .catch(console.log);

  //   navigate("/");
  // };

  const [centeredPos, setCenteredPos] = useState({lat:37.550201, lng:-121.980827});
  const [AQIStations, setAQIStations] = useState([]);

  useEffect(() => {
    axios.get("https://api.waqi.info/map/bounds/?token=d2583b4394214a830ffdade2d10b103620d66ee7&latlng=24.846565,-65.960261,48.987427,-124.732715")
    .then(response => {
      // console.log(response.data.data);
      setAQIStations(response.data.data);
      // console.log("centeredPos: ",centeredPos);
      console.log("In useEffect");
      console.log(process.env.API_KEY);

    })
    .catch((error) => console.log(error));
  }, [])
  // console.log("AQIStations:",AQIStations);

  const addAQIStyle = (aqi) => {
    const hValue = 120 - Math.floor(aqi * 0.8);
    const sValue = "100%";
    const lValue = "50%";

    return `hsl(${hValue},${sValue},${lValue})`
  }

  const addMarkers = links => map => {
    const markerList = [];
    var iconColor="";
    
    links.forEach((link, index) => {
      
      if (link.station.name.slice(link.station.name.length-6) !== "Mexico" && link.station.name.slice(link.station.name.length-6) !== "Canada"&& link.station.name.slice(link.station.name.length-8) !== "Saguenay") {
        if (link.aqi > 200){iconColor ="purple";}
        else if (link.aqi > 150){iconColor ="red";}
        else if (link.aqi > 100){iconColor ="orange";}
        else if (link.aqi > 50){iconColor ="yellow";}
        else if (link.aqi <= 50){iconColor ="green";}
        var position = new window.google.maps.LatLng(link.lat, link.lon);
        const marker = new window.google.maps.Marker({
          map,
          position: position,
          // animation: google.maps.Animation.DROP,
          // labelColor: "red",
          
          // label: {
          //   text: link.aqi,
          //   color: "black",
          // },
          title: link.station.name,
          id: index + 1,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/"+iconColor+"-dot.png"
          }
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
    options: { center: centeredPos, zoom: 8 },
    onMount: addMarkers(AQIStations)
  };

  return (
    <div className='App'>
      <SearchBox setLoc={longLat => setCenteredPos(longLat)}/>
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
