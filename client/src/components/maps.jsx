// import React,{ useEffect}  from 'react';
// import axios from "axios";
// import { GoogleMap, withScriptjs, withGoogleMap, GoogleApiWrapper } from "react-google-maps";


// function Map(){
//     return (<GoogleMap defaultZoom={10} 
//     defaultCenter={{lat:37.550201, lng:-121.980827}} //Fremont
    
//     />);
//   };
//   const WrappedMap = withScriptjs(withGoogleMap(Map));


// function MyMap() {
   
  
//     return (
//       <div style={{width: '100vw', height : '100vh'}}>
        
  
//         <WrappedMap 
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`}
//         loadingElement = {<div style={{height: "100%"}} />}
//         containerElement = {<div style={{height: "100%"}} />}
//         mapElement = {<div style={{height: "100%"}} />}
        
//         />
//       </div>
//     );
//   }
  
//   export default MyMap;

// /*global google*/ 
// import { functions, isEqual, omit } from 'lodash';
// import React, { useState, useEffect, useRef } from 'react';


// function Map({ options, onMount, className, onMountProps }) {
//   const ref = useRef();
//   const [map, setMap] = useState();
//   //AQIStations will be markers

//   useEffect(() => {
//     // The Google Maps API modifies the options object passed to
//     // the Map constructor in place by adding a mapTypeId with default
//     // value 'roadmap'. { ...options } prevents this by creating a copy.
//     const onLoad = () =>
//       setMap(new window.google.maps.Map(ref.current, { ...options }))
//     if (!window.google) {
//       const script = document.createElement(`script`)
//       script.src =
//         `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`
        
//       document.head.append(script)
//       script.addEventListener(`load`, onLoad)
//       return () => script.removeEventListener(`load`, onLoad);
//     } else onLoad()


//   }, [options])


    
  

//   if (map && typeof onMount === `function`) onMount(map, onMountProps)
//   return (
//     <div
//       style={{ height: `80vh`, margin: `1em 0`, borderRadius: `0.5em` }}
//       {...{ ref, className }}
//     />
//   )

  
// }
// function shouldNotUpdate(props, nextProps) {
//   const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
//   const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
//   const noFuncChange =
//     funcs.length === nextFuncs.length &&
//     funcs.every(fn => props[fn].toString() === nextProps[fn].toString())
//   return noPropChange && noFuncChange
// }
// export default React.memo(Map, shouldNotUpdate)

// Map.defaultProps = {
//   options: {
//     center: {lat:37.550201, lng:-121.980827},
//     zoom: 10,
    
//   },
  
// }



    // import React, { useEffect, useState, useRef } from 'react';
    // import axios from 'axios';

//     import React, { useEffect, useRef } from 'react';
 
// const GMap = (markerList) => {
//   const googleMapRef = useRef(null);
//   let googleMap = null;
 
  
 
//   // list of the marker object along with icon
  
//   useEffect(() => {
//     googleMap = initGoogleMap();
//     var bounds = new window.google.maps.LatLngBounds();
//     markerList.map(x => {
//       const marker = createMarker(x);
//       bounds.extend(marker.position);
//     });
//     googleMap.fitBounds(bounds); // the map to contain all markers
//   }, []);
 
 
//   // initialize the google map
//   const initGoogleMap = () => {
//     return new window.google.maps.Map(googleMapRef.current, {
//       center: {lat:37.550201, lng:-121.980827},
//       zoom: 10
//     });
//   }
 
//   // create marker on google map
//   const createMarker = (markerObj) => new window.google.maps.Marker({
//     position: { lat: markerObj.lat, lng: markerObj.lng },
//     map: googleMap,
//     icon: {
//       url: markerObj.icon,
//       // set marker width and height
//       scaledSize: new window.google.maps.Size(50, 50)
//     }
//   });
 
//   return <div
//     ref={googleMapRef}
//     style={{ height: `80vh`, margin: `1em 0`, borderRadius: `0.5em` }}
//   />
// }
 
// export default GMap;

import React, { useEffect, useRef } from "react";

export const Map = ({ options, onMount, className }) => {
  const props = { ref: useRef(), className };
  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options);
    onMount && onMount(map);
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });

  return (
    <div
      {...props}
      style={{ height: `100vh`, margin: `1em 0`, borderRadius: `0.5em` }}
    />
  );
};

Map.defaultProps = {
  options: {
    center: {lat:37.550201, lng:-121.980827},
    zoom: 10
  }
};
