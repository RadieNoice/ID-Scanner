import React, { useEffect, useState } from "react";
import Scanner from "../components/Scanner";
import Eventscard from "../components/Eventscard";
import Membercard from "../components/Membercard";
import axios from "axios";
const Dashboard = () => {
  const [rollno, setrollno] = useState("");
  const [roll_found, setroll_found] = useState(false);
  const [selected_event, setselected_event] = useState(false);
  const [events, setevents] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (!rollno || rollno.length === 0) {
      setroll_found(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/setmember/${rollno}`)
      .then((response) => {
        setuser(response.data);
        setroll_found(true);
      })
      .catch((error) => {
        console.error(error);
        setuser([]);
        setroll_found(false);
      });
  }, [rollno]);

  const mark_attendence = async () => {
    if (selected_event != null) {
      axios
        .post(`http://localhost:8080/api/attendance`, {
          eventId: selected_event,
          regnum: rollno,
          present: true,
        })
        .then((response) => {
          alert("attendance Marked");
          setattendacemarked(true);
          console.log(response.data);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Select an event");
    }
  };

  return (
    <div>
      <select
        value={selected_event}
        onChange={(e) => {
          setselected_event(Number(e.target.value));
        }}
      >
        <option value="">-- Select Event --</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.eventname}
          </option>
        ))}
      </select>
      <Scanner
        rollno={rollno}
        setrollno={setrollno}
      />
      <h3>Present Students</h3>
      <ul>{rollno}</ul>
      {roll_found && selected_event && <Membercard data={user} />}
      {roll_found && user && selected_event&& <button onClick={mark_attendence}>Yes</button>}
    </div>
  );
};

export default Dashboard;
