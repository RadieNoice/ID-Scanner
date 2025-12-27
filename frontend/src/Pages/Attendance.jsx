import React, { useEffect, useState } from "react";
import Attendancecard from "../components/Attendancecard";
import axios from "axios";

const Attendance = () => {
  const [events, setevents] = useState([]);
  const [selected_event, setselected_event] = useState("");
  const [attendances, setattendances] = useState([]);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
        console.log(events);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }, []);
  useEffect(() => {
    if (!selected_event) return;
    axios
      .get(`http://localhost:8080/api/attendance/event/${selected_event}`)
      .then((response) => {
        setattendances(response.data);
      });
  }, [selected_event, refresh]);

  return (
    <div>
      <select
        value={selected_event}
        onChange={(e) => {
          setselected_event(e.target.value);
        }}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.eventname}
          </option>
        ))}
      </select>
      {attendances.length > 0 ? (
        <>
          {attendances.map((attendance) => (
            <Attendancecard key={attendance.id} data={attendance} setrefresh={setrefresh}/>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Attendance;
