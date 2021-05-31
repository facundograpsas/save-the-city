import React, { useState, useRef, useEffect } from 'react';
import './line_canvas.css';

const LineCanvas = props => {
    const { width, height, position, initialPos, lineKey, hasCollide } = props

    const [animating, setAnimation] = useState(true)
    const canvasRef = useRef(null)

    const lineDirection = Math.round(Math.random())
    const lineAngle = Math.round(Math.random() * 10)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, xPos, yPos) => {
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        // ctx.beginPath()
        setDirection(lineDirection, ctx, xPos, yPos, initialPos);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let xPos = 0
        let yPos = 0
        let animationFrameId

        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.beginPath()
        context.moveTo(initialPos, 0)



        const render = () => {
            yPos += lineAngle
            xPos += 5
            draw(context, xPos, yPos)
            if (animating) {
                if (xPos % 15 === 0) {
                    setPosition(lineDirection, position, xPos, yPos, initialPos, lineKey);
                }
                animationFrameId = window.requestAnimationFrame(render)

            }
            else {
                position([null, null, lineKey])
                window.cancelAnimationFrame(animationFrameId)
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (xPos - initialPos > 1000) {
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
    setAnimation(false);
    setTimeout(() => {
        setAnimation(true);
        hasCollide.current = false;
    }, Math.random() * 5000);
}

const setDirection = (lineDirection, ctx, xPos, yPos, initialPos) => {
    if (lineDirection) {
        ctx.lineTo(initialPos + xPos, yPos)
        ctx.stroke()
    }
    else {
        ctx.lineTo(initialPos - xPos, xPos);
        ctx.stroke()
    }
}

const setPosition = (lineDirection, position, xPos, yPos, initialPos, lineKey) => {
    if (lineDirection) {
        position([initialPos + xPos, yPos, lineKey]);
    }
    else {
        position([initialPos - xPos, xPos, lineKey]);
    }
}

export default LineCanvas





