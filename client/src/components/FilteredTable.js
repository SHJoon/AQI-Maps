import React from "react";
import { navigate } from "@reach/router";

const FilteredTable = ({ setLoc, filteredStations }) => {
  const handleClick = (lat, lng) => {
    setLoc({ lat, lng });
    navigate(`/stations/${lat}/${lng}`);
  };

  return (
    <div style={{ height: "500px", overflow: "auto" }}>
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Station ID</th>
            <th>Station</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map((station, i) => {
            return (
              <tr key={i}>
                <td>{station.uid}</td>
                <td>{station.station.name}</td>
                <td>
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
