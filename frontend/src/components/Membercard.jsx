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
          <span>{data.name}</span>
          <span>{data.regnum}</span>
          <span>{data.role}</span>
          <span>{data.vit_email}</span>
          <span>{data.mobile_no}</span>
          <span>{data.college_department}</span>
          <span>{data.club_dept}</span>
    </div>
  )
}

export default Membercard