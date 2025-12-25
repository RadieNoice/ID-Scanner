import React, { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";

const Scanner = () => {
  const streamref = useRef(null);
  const canvasref = useRef(null);
  const videoref = useRef(null);
  const intervalref = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [rollno, setrollno] = useState([]);
  const [rollfound, setRollfound] = useState(false);
  useEffect(() => {
    rollno.length > 0 ? setRollfound(true) : setRollfound(false);
  }, [rollno]);
  const startCamera = async () => {
    streamref.current = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoref.current.srcObject = streamref.current;
    await videoref.current.play();
  };
  const stopCamera = async () => {
    streamref.current?.getTracks().forEach((track) => track.stop());
    if (videoref.current) {
      videoref.current.pause();
      videoref.current.srcObject = null;
    }
    streamref.current = null;
  };
  const startscanning = async () => {
    setScanning(true);
    await startCamera();
    intervalref.current = setInterval(extracttext, 500);
  };
  const stopscanning = async () => {
    setScanning(false);
    clearInterval(intervalref.current);
    setrollno("");
    setRollfound(false);
    await stopCamera();
  };

  const extracttext = async () => {
    const video = videoref.current;
    const canvas = canvasref.current;
    const ctx = canvas.getContext("2d");

    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;
    // ctx.drawImage(video, 0, 0);
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const scanWidth = 300;
    const scanHeight = 100;

    // 👇 center the box
    const startX = (videoWidth - scanWidth) / 2;
    const startY = (videoHeight - scanHeight) / 2;

    // canvas should match scan area
    canvas.width = scanWidth;
    canvas.height = scanHeight;

    // draw ONLY the selected area
    ctx.drawImage(
      video,
      startX,
      startY,
      scanWidth,
      scanHeight,
      0,
      0,
      scanWidth,
      scanHeight
    );
    const {
      data: { text },
    } = await Tesseract.recognize(canvas, "eng", {
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });
    const rolls = findrollnumber(text);
    setrollno(rolls);
  };
  const findrollnumber = (text) => {
    const regex = /\b\d{2}[A-Z]{3}\d{4}\b/g;
    return text.match(regex) || [];
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "300px",
            height: "100px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <video
            ref={videoref}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        {rollfound ? (
          <h3>Roll number detected</h3>
        ) : (
          <h3>Roll number not detected</h3>
        )}
        <h3>Present Students</h3>
        <ul>{rollno}</ul>
        <canvas ref={canvasref}></canvas>
        <div>
          {!scanning ? (
            <button onClick={startscanning}>Start Scanning</button>
          ) : (
            <button onClick={stopscanning}>Stop Scanning</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
