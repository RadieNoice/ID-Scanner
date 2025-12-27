import axios from "axios";
import React, { useState } from "react";

// "club_dept": "Technical Club",
// "college_department": "Computer Science",
// "mobile_no": "9876543210",
// "name": "Rahul",
// "regnum": "23BCE1234",
// "role": "0",
// "vit_email": "rahul.sharma@vit.ac.in"
const Membercard = ({ data, show_edit }) => {
  const [member, setmember] = useState(data);
  const [edit, setedit] = useState(false);
  const save_member = async () => {
    await axios
      .put(`http://localhost:8080/api/setmember/${member.id}`)
      .then((response) => {})
      .catch((err) => {});
    setedit(false);
  };
  return (
    <div>
      {!edit ? (
        <>
          <span>{data.name}</span>
          <span>{data.regnum}</span>
          <span>{data.role}</span>
          <span>{data.vit_email}</span>
          <span>{data.mobile_no}</span>
          <span>{data.college_department}</span>
          <span>{data.club_dept}</span>
          <button
            onClick={() => {
              setedit(true);
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={member.name}
            onChange={(e) => setmember({ ...member, name: e.target.value })}
          />
          <input
            type="text"
            value={member.regnum}
            onChange={(e) => setmember({ ...member, regnum: e.target.value })}
          />
          <input
            type="text"
            value={member.role}
            onChange={(e) => setmember({ ...member, role: e.target.value })}
          />
          <input
            type="text"
            value={member.vit_email}
            onChange={(e) =>
              setmember({ ...member, vit_email: e.target.value })
            }
          />
          <input
            type="number"
            value={member.mobile_no}
            onChange={(e) =>
              setmember({ ...member, mobile_no: e.target.value })
            }
          />
          <input
            type="text"
            value={member.college_department}
            onChange={(e) =>
              setmember({ ...member, mobile_no: e.target.value })
            }
          />
          <input
            type="text"
            value={member.club_dept}
            onChange={(e) =>
              setmember({ ...member, club_dept: e.target.value })
            }
          />
          <button
            onClick={() => {
              save_member;
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Membercard;
