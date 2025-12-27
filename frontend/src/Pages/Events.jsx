import React, { useEffect, useState } from "react";
import axios from "axios";
import Eventscard from "../components/Eventscard";

const Events = () => {
  const [events, setevents] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [createevent, setcreateevent] = useState(false);
  const [newevent, setnewevent] = useState({ name: "", desc: "", date: "" });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }, [refresh]);

  const put_event = async () => {
    await axios
      .post(`http://localhost:8080/api/event`, {
        eventname: newevent.name,
        eventdesc: newevent.desc,
        date: newevent.date,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => alert(error.response.data));
  };
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setcreateevent(true);
          }}
        >
          create event
        </button>
        {createevent && (
          <>
            <span>Event Name </span>
            <input
              type="text"
              value={newevent.name}
              onChange={(e) => {
                setnewevent({ ...newevent, name: e.target.value });
              }}
            />
            <span>Event Desc </span>
            <input
              type="text"
              value={newevent.desc}
              onChange={(e) => {
                setnewevent({ ...newevent, desc: e.target.value });
              }}
            />
            <span>Event date </span>
            <input
              type="date"
              value={newevent.date}
              onChange={(e) => {
                setnewevent({ ...newevent, date: e.target.value });
              }}
            />
            <button onClick={put_event}>create</button>
          </>
        )}
        {events.map((event) => (
          <Eventscard key={event.id} data={event} setrefresh={setrefresh} />
        ))}
      </div>
    </div>
  );
};

export default Events;
