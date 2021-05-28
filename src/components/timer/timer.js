import React, { useState, useEffect } from 'react';

import './timer.css';



const Timer = () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    return < div className="timer" > {timer}</div >
}

export default Timer