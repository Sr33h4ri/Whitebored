import { useRef, useState } from 'react';

type Line = {
  tool: 'brush' | 'eraser';
  points: number[];
}

const useBrushTool = (tool: 'brush' | 'eraser' = 'brush') => {
    const isDrawing = useRef(false)
    const [lines, setLines] = useState<Line[]>([])

    const handleMouseDown = (e) => {
        isDrawing.current = true
        const pos = e.target.getStage().getPointerPosition();
        setLines(prev => [
            ...prev,
            { tool, points: [pos.x, pos.y] }
        ])
    }

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        setLines(prev => {
            const lastLine = prev[prev.length - 1]
            if (!lastLine) {
                return prev
            }
            const updatedLine = {
                ...lastLine,
                points: lastLine.points.concat([point.x, point.y])
            }
            return [...prev.slice(0, -1), updatedLine]
        })
    }

    const handleMouseUp = () => {
        isDrawing.current = false;
    }

    return { lines, handleMouseDown, handleMouseMove, handleMouseUp };
}


export default useBrushTool;