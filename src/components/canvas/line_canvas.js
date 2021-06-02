import React, { useState, useRef, useEffect } from 'react'
import './line_canvas.css'

const LineCanvas = props => {
    const { width, height, position: notifyPosition, initialPos, lineKey, hasCollide, gameOver } = props

    const [animating, setAnimation] = useState(true)
    const canvasRef = useRef(null)

    const lineDirection = Math.round(Math.random())
    const xSpeed = Math.round(Math.random() * 1 + 1)
    const ySpeed = Math.round(Math.random() * 1 + 1)

    const draw = (ctx, xPos, yPos) => {
        setDirection(lineDirection, ctx, xPos, yPos, initialPos);
        ctx.stroke()
        if (xPos % 5 === 0) {
            setPosition(lineDirection, notifyPosition, xPos, yPos, initialPos, lineKey);
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let xPos = 0
        let yPos = 0
        let animationFrameId

        context.beginPath()
        context.lineWidth = 0.1
        context.moveTo(initialPos, 0)

        const render = () => {
            yPos += ySpeed
            xPos += xSpeed

            if (animating) {
                // if (!gameOver.current) {
                draw(context, xPos, yPos)
                animationFrameId = window.requestAnimationFrame(render)
                // setAnimation(false)
                // }
            }
            else {
                notifyPosition([null, null, lineKey])
                window.cancelAnimationFrame(animationFrameId)
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (yPos > height / 1.2) {
                destroyAndCreateLine(setAnimation, hasCollide);
            }

        }

        if (hasCollide.current) {
            destroyAndCreateLine(setAnimation, hasCollide);
        }

        render()
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas key={lineKey} className="Line-canvas" width={width} height={height} ref={canvasRef} />
}

const destroyAndCreateLine = (setAnimation, hasCollide) => {
    setAnimation(false)
    setTimeout(() => {
        setAnimation(true)
        hasCollide.current = false;
    }, Math.random() * 5000)
}

const setDirection = (lineDirection, ctx, xPos, yPos, initialPos) => {
    if (lineDirection) {
        ctx.lineTo(initialPos + xPos, yPos)
    }
    else {
        ctx.lineTo(initialPos - xPos, yPos);
    }
}

const setPosition = (lineDirection, notifyPosition, xPos, yPos, initialPos, lineKey) => {
    if (lineDirection) {
        notifyPosition([initialPos + xPos, yPos, lineKey])
    }
    else {
        notifyPosition([initialPos - xPos, yPos, lineKey])
    }
}

export default LineCanvas
