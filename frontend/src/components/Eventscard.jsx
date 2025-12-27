import React, { useState } from "react";
import axios from "axios";
// "date": "2025-12-31",
// "eventdesc": "danakunaka-part2",
// "eventname": "Dandanaka-part1",
// "id": 1
const Eventscard = ({ data, setrefresh }) => {
  const [editing, setEditing] = useState(false);
  const [name, setname] = useState(data.eventname);
  const [desc, setdesc] = useState(data.eventdesc);
  const [date, setdate] = useState(data.date);
  const save = async () => {
    setEditing(false);
    await axios
      .put(`http://localhost:8080/api/event/update/${data.id}`, {
        eventname: name,
        eventdesc: desc,
        date: date,
      })
      .then((Response) => {
        alert(Response.data);
        setrefresh((prev) => !prev);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  return (
    <div>
      {!editing ? (
        <>
          <p>
            {data.id} {name}
          </p>
          <p>des :{desc}</p>
          <p>date: {date}</p>
          <button
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />

          <button onClick={save}>Save</button>
          <button
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default Eventscard;
