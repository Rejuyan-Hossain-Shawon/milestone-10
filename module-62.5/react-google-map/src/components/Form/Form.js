import React, { useRef } from 'react';
import { useState } from 'react/cjs/react.development';

const Form = () => {
    const [destinantion, setDestination] = useState("");
    const [startpoint, setStartpoint] = useState("");

    const destinationRef = useRef("");
    const startPointRef = useRef("");
    const handleSubmit = (e) => {
        setDestination(destinationRef.current.value);
        setStartpoint(startPointRef.current.value);
        console.log(destinantion, startpoint)
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={destinationRef} type="text" placeholder="destination" />
                <input ref={startPointRef} type="text" placeholder="start point" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;