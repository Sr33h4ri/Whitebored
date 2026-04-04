import { Stage,Layer,Rect} from "react-konva"


function Canvas() {
  return (
    <Stage width={visualViewport?.width} height={visualViewport?.width}>
        <Layer>
            <Rect
                x={20}
                y={50}
                width={100}
                height={100}
                fill="red"
                draggable/>
        </Layer>
    </Stage>
  )
}


export default Canvas


