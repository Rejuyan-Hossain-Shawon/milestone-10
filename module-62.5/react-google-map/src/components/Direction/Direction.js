import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
const Direction = () => {
    const [destination, setDestination] = useState("kolkata");
    const [origin, setOrigin] = useState("dhaka");
    const [response, setResponse] = useState(null);


    const directionsCallback = (res) => {
        console.log(res)

        if (res !== null) {
            if (res === 'OK') {
                setResponse(res)
            } else {
                console.log('response: ', res)
            }
        }
    }
    return (
        <div>
            <LoadScript>
                <GoogleMap
                    // required
                    id='direction-example'
                    // required
                    mapContainerStyle={{
                        height: '400px',
                        width: '100%'
                    }}
                    // required
                    zoom={2}
                    // required
                    center={{
                        lat: 550,
                        lng: 180
                    }}


                >
                    {
                        (
                            destination !== '' &&
                            origin !== ''
                        ) && (
                            <DirectionsService
                                // required
                                options={{
                                    destination: destination,
                                    origin: origin,
                                    travelMode: "DRIVING"
                                }}
                                // required
                                callback={directionsCallback}


                            />
                        )
                    }

                    {
                        response !== null && (
                            <DirectionsRenderer
                                // required
                                options={{
                                    directions: response
                                }}


                            />
                        )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Direction;