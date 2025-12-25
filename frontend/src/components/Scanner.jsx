import React, { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import Membercard from "./Membercard";
import Eventscard from "./Eventscard";
import axios from "axios";

const Scanner = () => {
  const streamref = useRef(null);
  const canvasref = useRef(null);
  const videoref = useRef(null);
  const workerRef = useRef(null);
  const intervalref = useRef(null);
  const [user, setUser] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [rollno, setrollno] = useState("");
  const [rollfound, setRollfound] = useState(false);
  const [attendance, setAttendance] = useState(false);
  const [events, SetEvents] = useState([]);
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    if (!rollno || rollno.length === 0) {
      setRollfound(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/setmember/${rollno}`)
      .then((response) => {
        setUser(response.data);
        setRollfound(true);
      })
      .catch((error) => {
        console.error(error);
        setUser([]);
        setRollfound(false);
      });
  }, [rollno]);

  useEffect(() => {
    const initWorker = async () => {
      const worker = await createWorker("eng");
      // Set whitelist for better accuracy/speed since you know the format
      await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      });
      workerRef.current = worker;
      console.log("Worker Ready");
    };

    initWorker();

    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        SetEvents(response.data);
      })
      .catch((error) => {});
    // Cleanup: Terminate worker when component unmounts
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

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
    intervalref.current = setInterval(extracttext, 1500);
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
    } = await workerRef.current.recognize(canvas);
    const rolls = findrollnumber(text);
    setrollno((prev) => (rolls.length > 0 ? rolls[0] : prev));
  };
  const findrollnumber = (text) => {
    const regex = /\b\d{2}[A-Z]{3}\d{4}\b/g;
    return text.match(regex) || [];
  };

  const markattendence = async () => {
    axios
      .post(`http://localhost:8080/api/attendance`, {
        eventId: 2,
        regnum: rollno,
        present: true,
      })
      .then((response) => {
        setAttendance(true);
        console.log(response.data);
      })
      .catch((error) => {
        setAttendance(false);
        setBackendError(error.response.data);
      });
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
        {rollfound && <Membercard data={user} />}
        {rollfound && <button onClick={markattendence}>Yes</button>}
        {attendance && <p>Attendance marked sucessfully</p>}
        {!attendance && backendError && <p>{backendError}</p>}
        <canvas ref={canvasref}></canvas>
        <div>
          {!scanning ? (
            <button onClick={startscanning}>Start Scanning</button>
          ) : (
            <button onClick={stopscanning}>Stop Scanning</button>
          )}
        </div>
        <h3>Events</h3>
        {events.map((event) => (
          <Eventscard key={event.id} data={event} />
        ))}
      </div>
    </div>
  );
};

export default Scanner;
