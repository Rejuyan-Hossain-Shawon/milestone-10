import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import "./MapBoxDirection.css"

const MapBoxDirection = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmVqdXlhbmhvc3NhaW5zaGF3b24iLCJhIjoiY2t2NjdzN2g0OTc5ajJ6bW51cmJjbzFhaSJ9.MFNr6v3WwGeWL2A8yXgg0A';

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-79.4512, 43.6568],
            zoom: 13
        });

        map.addControl(
            new MapboxDirections({
                accessToken: mapboxgl.accessToken
            }),
            'top-left'
        );
    }, [])
    return (
        <div>

            <div id="map">

            </div>

        </div>
    );
};

export default MapBoxDirection;