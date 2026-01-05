import React, { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { Camera, StopCircle } from "lucide-react";

const Scanner = ({ setrollno }) => {
  const streamref = useRef(null);
  const canvasref = useRef(null);
  const videoref = useRef(null);
  const workerRef = useRef(null);
  const intervalref = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    const initWorker = async () => {
      const worker = await createWorker("eng");
      await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      });
      workerRef.current = worker;
      console.log("Worker Ready");
    };

    initWorker();
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      streamref.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoref.current.srcObject = streamref.current;
      await videoref.current.play();
      setCameraError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or not available.");
    }
  };

  const stopCamera = async () => {
    if (streamref.current) {
      streamref.current.getTracks().forEach((track) => track.stop());
    }
    if (videoref.current) {
      videoref.current.pause();
      videoref.current.srcObject = null;
    }
    streamref.current = null;
    setScanning(false); // Ensure scanning state is updated
  };

  const startscanning = async () => {
    setScanning(true);
    await startCamera();
    intervalref.current = setInterval(extracttext, 1500);
  };

  const stopscanning = async () => {
    setScanning(false);
    clearInterval(intervalref.current);
    // setrollno(""); // Don't clear result on stop, user might want to keep it
    await stopCamera();
  };

  const extracttext = async () => {
    if (!videoref.current || !canvasref.current) return;

    const video = videoref.current;
    const canvas = canvasref.current;
    const ctx = canvas.getContext("2d");

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    // Fallback if video is not ready
    if (videoWidth === 0 || videoHeight === 0) return;

    const scanWidth = 300;
    const scanHeight = 100;
    const startX = (videoWidth - scanWidth) / 2;
    const startY = (videoHeight - scanHeight) / 2;

    canvas.width = scanWidth;
    canvas.height = scanHeight;

    ctx.drawImage(video, startX, startY, scanWidth, scanHeight, 0, 0, scanWidth, scanHeight);

    if (workerRef.current) {
      const { data: { text } } = await workerRef.current.recognize(canvas);
      const rolls = findrollnumber(text);
      if (rolls.length > 0) {
        setrollno(rolls[0]);
        // Optional: Auto-stop on success? Maybe not for bulk scanning.
      }
    }
  };

  const findrollnumber = (text) => {
    const regex = /\b\d{2}[A-Z]{3}\d{4}\b/g;
    return text.match(regex) || [];
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopscanning();
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "150px",
          overflow: "hidden",
          position: "relative",
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!scanning && <p style={{ color: '#666' }}>Camera Off</p>}
        {cameraError && <p style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>{cameraError}</p>}

        <video
          ref={videoref}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            display: scanning ? 'block' : 'none'
          }}
        />

        {/* Overlay Box */}
        {scanning && (
          <div style={{
            position: 'absolute',
            border: '2px solid rgba(0,255,0,0.7)',
            width: '80%',
            height: '60%',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none'
          }}></div>
        )}
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasref} style={{ display: 'none' }}></canvas>

      <div style={{ width: '100%' }}>
        {!scanning ? (
          <button
            onClick={startscanning}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <Camera size={20} /> Start Camera
          </button>
        ) : (
          <button
            onClick={stopscanning}
            className="btn btn-outline"
            style={{ width: '100%', borderColor: '#EF4444', color: '#EF4444' }}
          >
            <StopCircle size={20} /> Stop Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default Scanner;