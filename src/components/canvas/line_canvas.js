import React, { useState, useRef, useEffect } from 'react';
import './line_canvas.css';

const LineCanvas = props => {
    const { width, height, position, initialPos, lineKey, hasCollide } = props

    const [animating, setAnimation] = useState(true)
    const canvasRef = useRef(null)

    const lineDirection = Math.round(Math.random())
    const xSpeed = Math.round(Math.random() * 2 + 1)
    const ySpeed = Math.round(Math.random() * 3 + 1)


    const draw = (ctx, xPos, yPos) => {
        setDirection(lineDirection, ctx, xPos, yPos, initialPos);
        ctx.lineWidth = 0.1;
        ctx.stroke()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let xPos = 0
        let yPos = 0
        let animationFrameId

        context.beginPath()
        context.moveTo(initialPos, 0)

        const render = () => {
            yPos += ySpeed
            xPos += xSpeed
            // if (xPos % 10 === 0) {
            draw(context, xPos, yPos)
            // }
            if (animating) {
                if (xPos % 5 === 0) {
                    setPosition(lineDirection, position, xPos, yPos, initialPos, lineKey);
                }
                animationFrameId = window.requestAnimationFrame(render)
            }
            else {
                position([null, null, lineKey])
                window.cancelAnimationFrame(animationFrameId)
                context.clearRect(0, 0, canvas.width, canvas.height);
            }


            if (yPos - initialPos > 300) {
                destroyAndCreateLine(setAnimation, hasCollide);
            }

        }
        context.stroke()
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
    setAnimation(false);
    setTimeout(() => {
        setAnimation(true);
        hasCollide.current = false;
    }, Math.random() * 5000);
}

const setDirection = (lineDirection, ctx, xPos, yPos, initialPos) => {
    if (lineDirection) {
        ctx.lineTo(initialPos + xPos, yPos)
    }
    else {
        ctx.lineTo(initialPos - xPos, yPos);
    }
}

const setPosition = (lineDirection, position, xPos, yPos, initialPos, lineKey) => {
    if (lineDirection) {
        position([initialPos + xPos, yPos, lineKey]);
        console.log([initialPos + xPos, yPos]);
    }
    else {
        position([initialPos - xPos, xPos, lineKey]);
        console.log([initialPos + xPos, yPos]);
    }
}

export default LineCanvas





