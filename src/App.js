import React, {useRef, useEffect, useState} from 'react';
import './App.css';

function App() {
 
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isSigning, setIsSigning] = useState(false) 

  useEffect(() =>{
    const canvas = canvasRef.current;
     canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight *2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d") 
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
    setIsSigning(true)
  }, [] )

  const startSigning = ({nativeEvent}) => {
const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
contextRef.current.moveTo(offsetX, offsetY) 
  }

  const finishedSigning = () => {
    contextRef.current.closePath()
setIsSigning(false)
  }
  const sign = (nativeEvent) => {
    if (!isSigning){
      return
    } 
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()

  }
 
  return (
   
 
 

    <canvas 
    onMouseDown={startSigning}
    onMouseUp={finishedSigning}
    onMouseMove={sign}
    ref={canvasRef}
    />
  );
}

export default App;
