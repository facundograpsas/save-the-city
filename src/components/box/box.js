import React, { useEffect, useRef, useState } from 'react'
import CircleCanvas from '../canvas/circle_canvas.js'
import LineCanvas from '../canvas/line_canvas.js'

import city from './city.png'

import './box.css'

import GameOverScreen from '../game_over/game_over_screen.js'

const Box = ({ title }) => {

    const [circle1, setCircle1] = useState({ canvas: null })
    const [circle2, setCircle2] = useState({ canvas: null })
    const [circle3, setCircle3] = useState({ canvas: null })
    const [circle4, setCircle4] = useState({ canvas: null })

    const [nextCircle, setNextCircle] = useState(0)

    const [line1, setLine1] = useState({ canvas: null })
    const [line2, setLine2] = useState({ canvas: null })
    const [line3, setLine3] = useState({ canvas: null })
    const [line4, setLine4] = useState({ canvas: null })
    const [line5, setLine5] = useState({ canvas: null })
    const [line6, setLine6] = useState({ canvas: null })
    const [line7, setLine7] = useState({ canvas: null })

    const [isGameOver, setGameOver] = useState(false)

    const [gameOverScreen, setGameOverScreen] = useState()

    const circlePos = useRef(0)
    const linePos = useRef(0)
    const collide = useRef(false)
    const gameBoxRef = useRef()
    const gameOver = useRef()

    let stateFunctions = useRef()
    let livesLost = 0

    const renderLine = (initialPos, lineKey) => {
        return <LineCanvas
            height={gameBoxRef.current.offsetHeight}
            width={gameBoxRef.current.offsetWidth}
            position={positions}
            initialPos={initialPos}
            lineKey={lineKey}
            hasCollide={collide}
            gameOver={gameOver}
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

        const mouseWheelHandler = (e) => {
            e.preventDefault()
        }

        document.addEventListener("mousewheel", mouseWheelHandler, { passive: false })

        const linesIndex = ["a", "b", "c", "d", "e", "f", "g"]
        stateFunctions.current = [
            setLine1, setLine2, setLine3, setLine4, setLine5, setLine6, setLine7
        ]

        if (!isGameOver) {
            for (let i = 0; i < linesIndex.length; i++) {
                setTimeout(() => {
                    stateFunctions.current[i]({ canvas: renderLine(randomNumber(500), linesIndex[i]) })
                },
                    Math.random() * 8000)
            }
        }
        else {
            setGameOverScreen()
        }

    }, [isGameOver])

    const positions = (val) => {
        if (val.color !== undefined) { circlePos.current = val }
        else { linePos.current = val }
        checkCollision(circlePos.current, linePos.current)
    }

    const checkCollision = (circlePos, linePos) => {

        let lineXPos = linePos[0]
        let lineYPos = linePos[1]
        let lineId = linePos[2]

        if ((lineXPos > 0 && lineXPos < 1200) && lineYPos > gameBoxRef.current.offsetHeight * 0.8) {
            collide.current = true
            livesLost++
            if (livesLost === 20) {
                setGameOver(true)
            }
        }
        else if (lineXPos > circlePos.left && lineXPos < circlePos.right && lineYPos > circlePos.top && lineYPos < circlePos.bottom) {
            collide.current = true
            switch (lineId) {
                case "a":
                    setLine1({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "a") })
                    break
                case "b":
                    setLine2({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "b") })
                    break
                case "c":
                    setLine3({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "c") })
                    break
                case "d":
                    setLine4({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "d") })
                    break
                case "e":
                    setLine5({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "e") })
                    break
                case "f":
                    setLine6({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "f") })
                    break
                case "g":
                    setLine7({ canvas: renderLine(randomNumber(gameBoxRef.current.offsetWidth), "g") })
                    break
                default:
                    break
            }
        }
    }

    const handleClick = (event) => {
        const mousePosX = Math.round(event.clientX - event.target.getBoundingClientRect().left)
        const mousePosY = Math.round(event.clientY - event.target.getBoundingClientRect().top)
        const randomColor = Math.floor(Math.random() * 16777215).toString(16)

        setNextCircle(prevInt => prevInt + 1)

        if (nextCircle === 0) {
            setCircle1({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
        else if (nextCircle === 1) {
            setCircle2({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
        else if (nextCircle === 2) {
            setCircle3({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
        else {
            setNextCircle(0)
            setCircle4({ canvas: renderCircle(mousePosX, mousePosY, "#" + randomColor) })
        }
    }

    return <div className="Game-box" onClick={handleClick} ref={gameBoxRef} >{title}
        <div className="City-box">
            <img className="City-image" src={city} alt=""></img>
        </div>
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
        {circle4.canvas}
        <GameOverScreen />
    </div>
}

const randomNumber = (max) => {
    return Math.round(Math.random() * max)
}

export default Box