import React, { useEffect, useState } from "react";
import axios from "axios";
import Membercard from "../components/Membercard";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  const fetchMembers = async () => {
    const res = await axios.get("http://localhost:8080/api/setmember");
    setMembers(res.data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const departments = [
    ...new Set(members.map((m) => m.college_department)),
  ];

  const filteredMembers = selectedDept
    ? members.filter(
        (m) => m.college_department === selectedDept
      )
    : members;

  return (
    <div>
      <h2>Members</h2>

      {}
      <select
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <hr />

      {}
      {filteredMembers.map((member) => (
        <Membercard
          key={member.regnum}
          data={member}
          refresh={fetchMembers}
        />
      ))}
    </div>
  );
};

export default Members;
