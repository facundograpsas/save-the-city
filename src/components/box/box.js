import React, { useEffect, useRef, useState } from 'react';
import CircleCanvas from '../canvas/circle_canvas.js'
import LineCanvas from '../canvas/line_canvas.js'

import './box.css';



const Box = ({ title }) => {

    const [circle1, setCircle1] = useState({ canvas: null })
    const [circle2, setCircle2] = useState({ canvas: null })
    const [nextCircle, setNextCircle] = useState(false)

    const [line1, setLine1] = useState({ canvas: null })
    const [line2, setLine2] = useState({ canvas: null })

    const circlePos = useRef(0);
    const linePos = useRef(0)
    const collide = useRef(false)
    const gameBoxRef = useRef()

    const renderLine = (color, initialPos, lineKey) => {
        return <LineCanvas
            height={gameBoxRef.current.offsetHeight}
            width={gameBoxRef.current.offsetWidth}
            color={color}
            position={positions}
            initialPos={initialPos}
            lineKey={lineKey}
            hasCollide={collide}
        ></LineCanvas>
    }

    const renderCircle = (mouseX, mouseY, color) => {
        return <CircleCanvas
            height={gameBoxRef.current.offsetHeight}
            width={gameBoxRef.current.offsetWidth}
            key={color}
            mouseX={mouseX}
            mouseY={mouseY}
            color={color}
            position={positions} />
    }

    useEffect(() => {

        setTimeout(() => {
            setLine1({ canvas: renderLine("1", randomNumber(1000), "a") })
        }, randomNumber(3000))

        setTimeout(() => {
            setLine2({ canvas: renderLine("2", randomNumber(1000), "b") })
        }, randomNumber(3000))
    }, [])

    const positions = (val) => {
        if (val.color !== undefined) { circlePos.current = val }
        else { linePos.current = val }
        checkCollision(circlePos.current, linePos.current)
    }

    const checkCollision = (circlePos, linePos) => {
        if (linePos[0] > circlePos.left && linePos[0] < circlePos.right && linePos[1] > circlePos.top && linePos[1] < circlePos.bottom) {
            if (linePos[2] === "a") {
                collide.current = true
                setLine1({ canvas: renderLine("1", randomNumber(1000), "a") })
            }
            else {
                collide.current = true
                setLine2({ canvas: renderLine("2", randomNumber(1000), "b") })
            }
        }
    }

    const handleClick = (event) => {

        const mousePosX = event.clientX - event.target.getBoundingClientRect().left
        const mousePosY = event.clientY - event.target.getBoundingClientRect().top

        setNextCircle(!nextCircle)

        if (nextCircle) {
            setCircle1({ canvas: renderCircle(mousePosX, mousePosY, "#DF0541"), position: "asd" })
        }
        else {
            setCircle2({ canvas: renderCircle(mousePosX, mousePosY, "#A10000"), position: "asd" })
        }
    }

    return <div className="game-box" onClick={handleClick} ref={gameBoxRef}>{title}
        {line2.canvas}
        {line1.canvas}
        {circle1.canvas}
        {circle2.canvas}
    </div>
}

const randomNumber = (max) => {
    return Math.random() * max
}

export default Box