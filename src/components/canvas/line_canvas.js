import React, { useState, useRef, useEffect } from 'react';
import './line_canvas.css';

const LineCanvas = props => {

    const { width, height, color, position, initialPos, lineKey, hasCollide } = props
    const [animating, setAnimation] = useState(true)
    const canvasRef = useRef(null)
    const lineDirection = Math.round(Math.random())

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, frameCount) => {
        ctx.clearRect(100, 500, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = color
        ctx.beginPath()
        setDirection(lineDirection, ctx, frameCount, initialPos);
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount += 2
            draw(context, frameCount)
            if (animating) {
                if (frameCount % 5 === 0) {
                    setPosition(lineDirection, position, frameCount, initialPos, lineKey);
                }
                animationFrameId = window.requestAnimationFrame(render)
            }
            else {
                position([null, null, lineKey])
                window.cancelAnimationFrame(animationFrameId)
                context.clearRect(0, 0, canvas.width, canvas.height);
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

    return <canvas key={lineKey} className="line-canvas" width={width} height={height} ref={canvasRef} />
}

const destroyAndCreateLine = (setAnimation, hasCollide) => {
    setAnimation(false);
    setTimeout(() => {
        setAnimation(true);
        hasCollide.current = false;
    }, Math.random() * 5000);
}

const setDirection = (lineDirection, ctx, frameCount, initialPos) => {
    if (lineDirection) {
        ctx.arc(frameCount + initialPos, frameCount, 2, 0, 10);
    }
    else {
        ctx.arc(initialPos - frameCount, frameCount, 2, 0, 10);
    }
}

const setPosition = (lineDirection, position, frameCount, initialPos, lineKey) => {
    if (lineDirection) {
        position([frameCount + initialPos, frameCount, lineKey]);
    }
    else {
        position([initialPos - frameCount, frameCount, lineKey]);
    }
}

export default LineCanvas





