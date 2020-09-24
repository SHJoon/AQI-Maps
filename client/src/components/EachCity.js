import React , {useEffect, useState} from 'react';
import axios from 'axios';

const EachCity = (props) => {
    const { locLat, locLng } = props;

    const [ locationData, setLocationData ] = useState(null);
    const [ didRetrieve, setDidRetrieve ] = useState(true);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const iaqiKeys = ["co", "h", "no2", "o3", "p", "pm10", "pm25", "so2", "t", "w"];
    
    useEffect(() => {
        axios.get(`https://api.waqi.info/feed/geo:${locLat};${locLng}/?token=d2583b4394214a830ffdade2d10b103620d66ee7`)
        .then(res => {
            if (res.data.status == "ok") {
                const copiedData = {...res.data.data};
                for (let key of iaqiKeys) {
                    if (!copiedData.iaqi.hasOwnProperty(key)){
                        copiedData.iaqi[key] = {v:"N/A"};
                    }
                }
                setLocationData(copiedData);
            }
            else setDidRetrieve(false);
            setIsLoaded(true);
        })
        .catch(err => console.error(err))
    }, [locLat, locLng])


    if (!isLoaded || locationData==null) {
        return(<div>Fetching station information...</div>)
    }

    if (!didRetrieve) {
        return(<div>
            No information in this area...
        </div>)
    }

    return(
        <div>
            <h2>{locationData.city.name}</h2>
            <h3>Air Quality Index: {locationData.aqi}</h3>
            <p>CO: {locationData.iaqi.co.v}</p>
            <p>H: {locationData.iaqi.h.v}</p>
            <p>NO<sub>2</sub>: {locationData.iaqi.no2.v}</p>
            <p>O<sub>3</sub>: {locationData.iaqi.o3.v}</p>
            <p>P: {locationData.iaqi.p.v}</p>
            <p>PM<sub>10</sub>: {locationData.iaqi.pm10.v}</p>
            <p>PM<sub>2.5</sub>: {locationData.iaqi.pm25.v}</p>
            <p>SO<sub>2</sub>: {locationData.iaqi.so2.v}</p>
            <p>T: {locationData.iaqi.t.v}</p>
            <p>W: {locationData.iaqi.w.v}</p>
        </div>
    )
}

export default EachCity;