import React from 'react'

    // "club_dept": "Technical Club",
    // "college_department": "Computer Science",
    // "mobile_no": "9876543210",
    // "name": "Rahul",
    // "regnum": "23BCE1234",
    // "role": "0",
    // "vit_email": "rahul.sharma@vit.ac.in"
const Membercard = ({ data }) => {
  return (
      <div>
          <p>{data.name}</p>
          <p>{data.regnum}</p>
          <p>{data.role}</p>
          <p>{data.vit_email}</p>
          <p>{data.mobile_no}</p>
          <p>{data.college_department}</p>
          <p>{data.club_dept}</p>
    </div>
  )
}

export default Membercard