import React, { useEffect, useState } from "react";
import Membercard from "./Membercard";
import axios from "axios";
// "id": 1,
// "markedAt": "2025-12-25T19:00:23.593412",
// "member": {
//     "club_dept": "Technical Club",
//     "college_department": "Computer Science",
//     "mobile_no": "9876543210",
//     "name": "Rahul",
//     "regnum": "23BCE1234",
//     "role": "0",
//     "vit_email": "rahul.sharma@vit.ac.in"
// },
// "present": true

const Attendancecard = ({ data, setrefresh }) => {
  const deleteattendance = async () => {
    await axios
      .delete(`http://localhost:8080/api/attendance/${data.id}`)
      .then((response) => {
        alert(response.data);
        setrefresh((prev) => !prev);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  return (
    <div>
      <span>{data.id}</span>
      <span>{data.marked_At}</span>
      <Membercard data={data.member} />
      <span>{data.present}</span>
      <button onClick={deleteattendance}>delete</button>
    </div>
  );
};

export default Attendancecard;
