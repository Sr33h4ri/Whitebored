import { Stage, Layer, Line } from "react-konva"
import { useEffect, useState } from 'react';
import useBrushTool from './BrushTool'

type LineType = {
  points: number[];
  tool: 'brush' | 'eraser';
}

function Canvas() {
    const [activeTool, setActiveTool] = useState<'brush' | 'eraser'>('brush');
    const { lines, handleMouseDown, handleMouseMove, handleMouseUp } = useBrushTool(activeTool);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'e') {
                setActiveTool('eraser')
            } else if (e.key === 'b') {
                setActiveTool('brush')
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    const width = visualViewport?.width ?? window.innerWidth
    const height = visualViewport?.height ?? window.innerHeight

    return (
    <Stage width={width} height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        >
        <Layer>
            {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            listening={false}
            globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
          />
           ))}
        </Layer>
    </Stage>
  )
}

export default Canvas


