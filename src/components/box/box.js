import React, { useEffect, useRef, useState } from 'react';
import CircleCanvas from '../canvas/circle_canvas.js'
import LineCanvas from '../canvas/line_canvas.js'
import './box.css';

const Box = ({ title }) => {

    const [circle1, setCircle1] = useState({ canvas: null })
    const [circle2, setCircle2] = useState({ canvas: null })
    const [circle3, setCircle3] = useState({ canvas: null })

    const [nextCircle, setNextCircle] = useState(0)

    const [line1, setLine1] = useState({ canvas: null })
    const [line2, setLine2] = useState({ canvas: null })
    const [line3, setLine3] = useState({ canvas: null })
    const [line4, setLine4] = useState({ canvas: null })
    const [line5, setLine5] = useState({ canvas: null })
    const [line6, setLine6] = useState({ canvas: null })
    const [line7, setLine7] = useState({ canvas: null })

    const [lines, setLines] = useState(Array(7).fill("null"))

    const circlePos = useRef(0);
    const linePos = useRef(0)
    const collide = useRef(false)
    const gameBoxRef = useRef()

    const renderLine = (initialPos, lineKey) => {
        return <LineCanvas
            height={gameBoxRef.current.offsetHeight}
            width={gameBoxRef.current.offsetWidth}
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

        const linesIndex = ["a", "b", "c", "d", "e", "f", "g"]
        const stateFunctions = [
            setLine1, setLine2, setLine3, setLine4, setLine5, setLine6, setLine7
        ]

        for (let i = 0; i < lines.length; i++) {
            setTimeout(() => {
                stateFunctions[i]({ canvas: renderLine(randomNumber(500), linesIndex[i]) })
            },
                Math.random() * 8000);
        }
    }, [])

    const positions = (val) => {
        if (val.color !== undefined) { circlePos.current = val }
        else { linePos.current = val }
        checkCollision(circlePos.current, linePos.current)
    }

    const checkCollision = (circlePos, linePos) => {
        if ((linePos[0] > circlePos.left && linePos[0] < circlePos.right) && (linePos[1] > circlePos.top && linePos[1] < circlePos.bottom)) {
            collide.current = true
            let myArr = [...lines]
            myArr[linePos[2]] = { canvas: renderLine(randomNumber(1000), linePos[2]) }
            switch (linePos[2]) {
                case "a":
                    setLines(myArr)
                    break
                case "b":
                    setLine2({ canvas: renderLine(randomNumber(1000), "b") })
                    break
                case "c":
                    setLine3({ canvas: renderLine(randomNumber(1000), "c") })
                    break
                case "d":
                    setLine4({ canvas: renderLine(randomNumber(1000), "d") })
                    break
                case "e":
                    setLine5({ canvas: renderLine(randomNumber(1000), "e") })
                    break
                case "f":
                    setLine6({ canvas: renderLine(randomNumber(1000), "f") })
                    break
                case "g":
                    setLine7({ canvas: renderLine(randomNumber(1000), "g") })
                    break
                default:
                    break
            }
        }
    }

    const handleClick = (event) => {

        const mousePosX = Math.round(event.clientX - event.target.getBoundingClientRect().left)
        const mousePosY = Math.round(event.clientY - event.target.getBoundingClientRect().top)

        setNextCircle(prevInt => prevInt + 1)

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        if (nextCircle === 0) {
            setCircle1({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
        else if (nextCircle === 1) {
            setCircle2({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
        else {
            setNextCircle(0)
            setCircle3({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
    }

    return <div className="Game-box" onClick={handleClick} ref={gameBoxRef}>{title}
        {line1.canvas}
        {line2.canvas}
        {line3.canvas}
        {line4.canvas}
        {line5.canvas}
        {line6.canvas}
        {line7.canvas}
        {circle1.canvas}
        {circle2.canvas}
        {circle3.canvas}
    </div>
}

const randomNumber = (max) => {
    return Math.round(Math.random() * max + 300)
}

export default Box