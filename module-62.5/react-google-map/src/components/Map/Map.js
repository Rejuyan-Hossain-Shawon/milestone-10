import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 25.147690,
    lng: 75.864952
};

const Map = () => {

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript >
    );
};

export default Map;