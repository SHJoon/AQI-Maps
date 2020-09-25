import React from "react";
import { navigate } from "@reach/router";

const FilteredTable = ({ setLoc, filteredStations }) => {
  const tableStyle = {
    border: "1px solid black",
    padding: "5px",
  };

  const handleClick = (lat, lng) => {
    setLoc({ lat, lng });
    navigate(`/stations/${lat}/${lng}`);
  };

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th style={tableStyle}>Station ID</th>
            <th style={tableStyle}>Station</th>
            <th style={tableStyle}>AQI</th>
            <th style={tableStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations
            .sort((a, b) => (parseInt(a.aqi) > parseInt(b.aqi) ? 1 : -1))
            .map((station, i) => {
              return (
                <tr key={i}>
                  <td style={tableStyle}>{station.uid}</td>
                  <td style={tableStyle}>{station.station.name}</td>
                  <td style={tableStyle}>{station.aqi}</td>
                  <td style={tableStyle}>
                    <button
                      onClick={(e) => handleClick(station.lat, station.lon)}
                    >
                      Go to station
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;
