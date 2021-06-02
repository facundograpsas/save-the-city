import React, { useRef, useEffect } from 'react'
import './circle_canvas.css'

const CircleCanvas = props => {
    const { mouseX, mouseY, width, height, color, position } = props

    const currentColor = color
    const canvasRef = useRef(null)
    let frameCount = 0
    let circleSize = Math.round(Math.random() * 100 + 40)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, frameCount) => {
        ctx.arc(mouseX, mouseY, Math.round(100 * Math.sin(frameCount * 0.01) ** 2), 0, 2 * 3.14)
        ctx.fill()
    }
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let animationFrameId

        context.fillStyle = color
        context.beginPath()

        const render = () => {
            frameCount++

            draw(context, frameCount)

            var collideObj = {
                right: mouseX + (circleSize * Math.sin(frameCount * 0.01) ** 2),
                left: mouseX - (circleSize * Math.sin(frameCount * 0.01) ** 2),
                bottom: mouseY + (circleSize * Math.sin(frameCount * 0.01) ** 2),
                top: mouseY - (circleSize * Math.sin(frameCount * 0.01) ** 2),
                color: currentColor
            }
            if (frameCount % 2 === 0) {
                position(collideObj)
            }
            if (frameCount < circleSize) {
                animationFrameId = window.requestAnimationFrame(render)
            }
            else {
                window.cancelAnimationFrame(animationFrameId)
                context.clearRect(0, 0, canvas.width, canvas.height);
                position({ color: currentColor })
            }
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas key={"color"} className="Circle-canvas" width={width} height={height} ref={canvasRef} />
}

export default CircleCanvas