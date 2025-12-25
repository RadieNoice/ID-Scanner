import React, { useState } from "react";

// "date": "2025-12-31",
// "eventdesc": "danakunaka-part2",
// "eventname": "Dandanaka-part1",
// "id": 1
const Eventscard = ({ data }) => {
  return (
    <div>
          <p>{data.id} {data.eventname}</p>
    </div>
  );
};

export default Eventscard;
