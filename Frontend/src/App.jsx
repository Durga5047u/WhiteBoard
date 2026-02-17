// import { Client } from "@stomp/stompjs";
// import React, { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";
// import "./App.css"

// const App = () => {
//   const clientRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [color, setColor] = useState("#000000");
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [currentStroke, setCurrentStroke] = useState([]);
//   const [strokes, setStrokes] = useState([]);
//   const [tool, setTool] = useState("pen"); // pen or eraser

//   // CONNECT
//   useEffect(() => {
//     const client = new Client({
//       webSocketFactory: () => new SockJS("http://localhost:5173/ws"),
//       reconnectDelay: 5000,

//       onConnect: () => {
//         console.log("Connected");

//         client.subscribe("/topic/drawings", (message) => {
//           const stroke = JSON.parse(message.body);
//           setStrokes((prev) => [...prev, stroke]);
//         });

//         client.subscribe("/topic/clear", () => {
//           setStrokes([]);
//         });
//       },
//     });

//     client.activate();
//     clientRef.current = client;

//     return () => client.deactivate();
//   }, []);

//   // LOAD FROM DB
//   useEffect(() => {
//     fetch("http://localhost:5173/api/strokes")
//       .then((res) => res.json())
//       .then((data) => {
//         data.forEach((stroke) => {
//           setStrokes((prev) => [...prev, JSON.parse(stroke.data)]);
//         });
//       });
//   }, []);

//   //resize canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       redrawCanvas();
//     };

//     resizeCanvas(); // initial size

//     window.addEventListener("resize", resizeCanvas);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [strokes]);  // 👈 IMPORTANT

//   const redrawCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     strokes.forEach((stroke) => drawStroke(ctx, stroke));
//   };

//   useEffect(() => {
//     redrawCanvas();
//   }, [strokes]);






//   // REDRAW
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     strokes.forEach((stroke) => drawStroke(ctx, stroke));

//     if (currentStroke.length > 1) {
//       drawStroke(ctx, {
//         points: currentStroke,
//         color: tool === "eraser" ? "#FFFFFF" : color,
//         width: tool === "eraser" ? 20 : 2,
//       });
//     }
//   }, [strokes, currentStroke]);

//   const drawStroke = (ctx, stroke) => {
//     if (!stroke.points || stroke.points.length < 2) return;

//     ctx.beginPath();
//     ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

//     for (let i = 1; i < stroke.points.length; i++) {
//       ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
//     }

//     ctx.strokeStyle = stroke.color;
//     ctx.lineWidth = stroke.width;
//     ctx.stroke();
//   };

//   const startDrawing = (e) => {
//     setIsDrawing(true);
//     const { offsetX, offsetY } = e.nativeEvent;
//     setCurrentStroke([{ x: offsetX, y: offsetY }]);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const { offsetX, offsetY } = e.nativeEvent;
//     setCurrentStroke((prev) => [...prev, { x: offsetX, y: offsetY }]);
//   };

//   const stopDrawing = () => {
//     if (!isDrawing) return;
//     setIsDrawing(false);

//     if (currentStroke.length > 1) {
//       const stroke = {
//         points: currentStroke,
//         color: tool === "eraser" ? "#FFFFFF" : color,
//         width: tool === "eraser" ? 20 : 2,
//       };

//       clientRef.current.publish({
//         destination: "/app/draw",
//         body: JSON.stringify(stroke),
//       });

//       setStrokes((prev) => [...prev, stroke]);
//     }

//     setCurrentStroke([]);
//   };

//   const clearBoard = () => {
//     clientRef.current.publish({
//       destination: "/app/clear",
//       body: "CLEAR",
//     });
//   };

//   return (
//     <div>
//       <h2>Live Collaborative Whiteboard</h2>

//       <div className="paintOptions">
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//         />
//         <button onClick={() => setTool("pen")}>Pen</button>
//         <button onClick={() => setTool("eraser")}>Eraser</button>
//         <button onClick={clearBoard}>Clear Board</button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           background: "white"
//         }}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />

//     </div>
//   );
// };

// export default App;


import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import "./App.css";

const App = () => {
  const clientRef = useRef(null);
  const canvasRef = useRef(null);

  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [strokes, setStrokes] = useState([]);
  const [tool, setTool] = useState("pen");

  // =============================
  // CONNECT TO WEBSOCKET
  // =============================
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("https://whiteboard-backend-mj13.onrender.com/ws"), // use Vite proxy
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected");

        client.subscribe("/topic/drawings", (message) => {
          const stroke = JSON.parse(message.body);
          setStrokes((prev) => [...prev, stroke]);
        });

        client.subscribe("/topic/clear", () => {
          setStrokes([]);
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, []);

  // =============================
  // LOAD FROM DATABASE
  // =============================
  useEffect(() => {
    fetch("https://whiteboard-backend-mj13.onrender.com/api/strokes")
      .then((res) => res.json())
      .then((data) => {
        const loaded = data.map((stroke) => JSON.parse(stroke.data));
        setStrokes(loaded);
      });
  }, []);

  // =============================
  // FULLSCREEN CANVAS RESIZE
  // =============================
  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawAll();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // =============================
  // DRAW ALL (Single Source of Truth)
  // =============================
  const drawAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => drawStroke(ctx, stroke));

    if (currentStroke.length > 1) {
      drawStroke(ctx, {
        points: currentStroke,
        color: tool === "eraser" ? "#FFFFFF" : color,
        width: tool === "eraser" ? 20 : 2,
      });
    }
  };

  // =============================
  // REDRAW WHEN DATA CHANGES
  // =============================
  useEffect(() => {
    drawAll();
  }, [strokes, currentStroke]);

  // =============================
  // DRAW SINGLE STROKE
  // =============================
  const drawStroke = (ctx, stroke) => {
    if (!stroke.points || stroke.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  // =============================
  // MOUSE EVENTS
  // =============================
  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentStroke([{ x: offsetX, y: offsetY }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setCurrentStroke((prev) => [...prev, { x: offsetX, y: offsetY }]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);

    if (currentStroke.length > 1) {
      const stroke = {
        points: currentStroke,
        color: tool === "eraser" ? "#FFFFFF" : color,
        width: tool === "eraser" ? 20 : 2,
      };

      clientRef.current.publish({
        destination: "/app/draw",
        body: JSON.stringify(stroke),
      });

      setStrokes((prev) => [...prev, stroke]);
    }

    setCurrentStroke([]);
  };

  // =============================
  // CLEAR BOARD
  // =============================
  const clearBoard = () => {
    clientRef.current.publish({
      destination: "/app/clear",
      body: "CLEAR",
    });
  };

  return (
    <div>
      <div className="paintOptions">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={() => setTool("pen")}>Pen</button>
        <button onClick={() => setTool("eraser")}>Eraser</button>
        <button onClick={clearBoard}>Clear Board</button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "white",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default App;
