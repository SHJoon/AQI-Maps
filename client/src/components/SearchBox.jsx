import React, { useState } from "react";
import Geocode from "react-geocode";
// import { navigate } from "@reach/router";

const SearchBox = ({ setLoc }) => {
  const [address, setAddress] = useState("");
  Geocode.setApiKey(process.env.REACT_APP_API_KEY);
    function handleSubmit (event) {
        event.preventDefault();
        Geocode.fromAddress(address).then(
            res => {
                // console.log("res.data.results.geometry.address: ",res.results[0].geometry.address);
                setLoc(res.results[0].geometry.location);
            },
            err => {
              console.error(err);
            }
          );
        setAddress("");
    };
 

  return (
    <form onSubmit={(event) => {
        handleSubmit(event);
      }}>
        <label>Address:</label>
        <input type="text" 
            className = "mx-2"
            value = {address}
            onChange={(event) => {
            setAddress(event.target.value);
        }}/>
        <button>Show</button>
    </form>
  );
};

export default SearchBox;