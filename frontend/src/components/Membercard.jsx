import axios from "axios";
import React, { useState } from "react";

const Membercard = ({ data, refresh }) => {
  const [member, setMember] = useState(data);
  const [edit, setEdit] = useState(false);

  const save_member = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/setmember/${member.regnum}`,
        member
      );
      setEdit(false);
      refresh(); // refresh parent list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      {!edit ? (
        <>
          <p><b>Name:</b> {data.name}</p>
          <p><b>Reg No:</b> {data.regnum}</p>
          <p><b>Role:</b> {data.role}</p>
          <p><b>Email:</b> {data.vit_email}</p>
          <p><b>Mobile:</b> {data.mobile_no}</p>
          <p><b>Dept:</b> {data.college_department}</p>
          <p><b>Club:</b> {data.club_dept}</p>

          <button onClick={() => setEdit(true)}>Edit</button>
        </>
      ) : (
        <>
          <input
            value={member.name}
            onChange={(e) =>
              setMember({ ...member, name: e.target.value })
            }
          />
          <input value={member.regnum} disabled />
          <input
            value={member.role}
            onChange={(e) =>
              setMember({ ...member, role: e.target.value })
            }
          />
          <input
            value={member.vit_email}
            onChange={(e) =>
              setMember({ ...member, vit_email: e.target.value })
            }
          />
          <input
            value={member.mobile_no}
            onChange={(e) =>
              setMember({ ...member, mobile_no: e.target.value })
            }
          />
          <input
            value={member.college_department}
            onChange={(e) =>
              setMember({
                ...member,
                college_department: e.target.value,
              })
            }
          />
          <input
            value={member.club_dept}
            onChange={(e) =>
              setMember({ ...member, club_dept: e.target.value })
            }
          />

          <button onClick={save_member}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Membercard;
