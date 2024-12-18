import { useEffect, useRef, useState } from "react";
import { Expand } from "lucide-react";
import { LayoutContext } from "../../context/LayoutContext";
// import { useContext } from "react";
import NoteToolBar from "../NoteToolBar/NoteToolBar";

const WhiteBoard = ({ role }) => {
  // const { updateLayoutMode } = useContext(LayoutContext);
  // const { brushColor, brushSize } = props;
  const [brushColor, setBrushColor] = useState("#FF0000");
  const [brushSize, setBrushSize] = useState(2);
  const canvasRef = useRef(null);

  useEffect(() => {
    // canvasRef.current.width = canvasRef.current.clientWidth;
    // canvasRef.current.height = canvasRef.current.clientHeight;
    // Variables to store drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const createStripe = (width, height) => {
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const gridSize = 30;
      const stripeColor = "#f0f0f0";
      const oldStripeColor = ctx.strokeStyle;
      ctx.strokeStyle = stripeColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x = 0; x < width; x += gridSize) {
        for(let y = 0; y < height; y += gridSize) {
          // ctx.setLineDash([2, 20]);
          ctx.strokeRect(x, y, x + gridSize, y + gridSize)
          ctx.stroke(); 
        }
      }
      ctx.strokeStyle = oldStripeColor;
    }

    const startDrawing = (e) => {
      isDrawing = true;
      console.log(`drawing started`, brushColor, brushSize);
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    // Function to draw
    const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };


    // Function to end drawing
    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL(); // Get the data URL of the canvas content


      // Send the dataURL or image data to the socket
      // console.log('drawing ended')
      // if (socket) {
      //   socket.emit('canvasImage', dataURL);
      //   console.log('drawing ended')
      // }
      isDrawing = false;
    };

    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext('2d');
    
    // Set initial drawing styles
    if (ctx) {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);
    
    const resizeObserver = new ResizeObserver(entries => {
      console.log(entries);
      const entry = entries[0];
      if(canvas === null || canvasRef.current === null) return;
      canvas.width = entry.contentRect.width;
      canvas.height = entry.contentRect.height;
      createStripe(canvasRef.current.width, canvasRef.current.height);
    });

    resizeObserver.observe(canvasRef.current);
    
    return () => {
      // Clean up event listeners when component unmounts
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseout', endDrawing);
    };
  }, [brushColor, brushSize]);

  return (
    <div className="bg-white h-full w-full relative">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <Expand cursor={"pointer"} color="black" size={20} className="absolute right-2 top-2"/>
      <NoteToolBar className="absolute top-12 left-2" />
    </div>
  )
}

export default WhiteBoard;

