import React, { useState } from "react";
import axios from "axios";
// "date": "2025-12-31",
// "eventdesc": "danakunaka-part2",
// "eventname": "Dandanaka-part1",
// "id": 1
const Eventscard = ({ data, setrefresh }) => {
  const [editing, setEditing] = useState(false);
  const [name, setname] = useState(data.eventname);
  const save = async () => {
    setEditing(false);
    // await axios.put(`http://localhost:8080/api/event/update${data.id}`, {
    //   eventname: name,
    // });
  };
  return (
    <div>
      {!editing ? (
        <>
          <span>
            {data.id} {data.eventname}
          </span>
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
          <button onClick={save}>Save</button>
        </>
      )}
    </div>
  );
};

export default Eventscard;
