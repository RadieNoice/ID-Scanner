import React, { useEffect, useState } from "react";
import Scanner from "../components/Scanner";
import Membercard from "../components/Membercard";
import axios from "axios";
import { CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [rollno, setrollno] = useState("");
  const [roll_found, setroll_found] = useState(false);
  const [selected_event, setselected_event] = useState("");
  const [events, setevents] = useState([]);
  const [user, setuser] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    if (!rollno || rollno.length === 0) {
      setroll_found(false);
      setuser(null);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/setmember/${rollno}`)
      .then((response) => {
        setuser(response.data);
        setroll_found(true);
        setAttendanceMarked(false); // Reset status for new user
      })
      .catch((error) => {
        console.error(error);
        setuser(null);
        setroll_found(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rollno]);

  const mark_attendence = async () => {
    if (selected_event) {
      axios
        .post(`http://localhost:8080/api/attendance`, {
          eventId: selected_event,
          regnum: rollno,
          present: true,
        })
        .then((response) => {
          setAttendanceMarked(true);
          console.log(response.data);
        })
        .catch((error) => {
          alert(error.response?.data || "Error marking attendance");
        });
    } else {
      alert("Please select an event first");
    }
  };

  const uploadAttendanceExcel = async () => {
    if (!selected_event) {
      alert("Please select an event first");
      return;
    }

    if (!excelFile) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("eventId", selected_event);
    formData.append("file", excelFile);

    try {
      setUploading(true);

      const response = await axios.post(
        "http://localhost:8080/api/attendance/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResult(response.data);

    } catch (error) {
      alert(error.response?.data || "Failed to upload Excel");
    } finally {
      setUploading(false);
    }
  };


  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Scan ID cards and mark attendance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Controls & Scanner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>1. Select Event</h3>
            <select
              value={selected_event}
              onChange={(e) => setselected_event(Number(e.target.value))}
              style={{ width: '100%' }}
            >
              <option value="">-- Choose an active event --</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.eventname}
                </option>
              ))}
            </select>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>2. Scan ID</h3>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
              <Scanner rollno={rollno} setrollno={setrollno} />
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Current Input: <strong>{rollno || "Waiting for scan..."}</strong>
            </p>
          </div>

        </div>

        {/* Right Column: Result & Action */}
        <div>
          {loading && <div className="card">Searching for member...</div>}

          {!loading && roll_found && user && (
            <div className="card" style={{ borderTop: '4px solid var(--primary-color)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <Membercard data={user} show_edit={0} />
              </div>

              {attendanceMarked ? (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600
                }}>
                  <CheckCircle size={20} />
                  Attendance Marked Successfully!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {!selected_event && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: '#FEF9C3',
                      color: '#854D0E',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}>
                      <AlertCircle size={16} />
                      Select an event to mark attendance
                    </div>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={mark_attendence}
                    disabled={!selected_event}
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}
                  >
                    Mark Present
                  </button>
                </div>
              )}
            </div>
          )}

          {!loading && !roll_found && rollno.length > 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
              <AlertCircle size={48} style={{ marginBottom: '1rem', color: '#EF4444' }} />
              <h3 style={{ color: '#EF4444', marginBottom: '0.5rem' }}>Member Not Found</h3>
              <p>No member found with registration number: {rollno}</p>
            </div>
          )}

          {!loading && !rollno && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
              <p>Scan Vit ID to view member details.</p>
            </div>
          )}

          {/* Upload Attendance (Excel) – Compact */}
          <div
            className="card"
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
            }}
          >
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
              Upload Attendance (Excel)
            </h4>

            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setExcelFile(e.target.files[0])}
              style={{ fontSize: "0.85rem", marginBottom: "0.75rem" }}
            />

            <button
              className="btn btn-primary"
              onClick={uploadAttendanceExcel}
              disabled={uploading || !selected_event}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              {uploading ? "Uploading..." : "Upload Excel"}
            </button>

            {uploadResult && (
              <div
                style={{
                  marginTop: "0.75rem",
                  fontSize: "0.8rem",
                  backgroundColor: "#F0FDF4",
                  padding: "0.5rem",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div><b>Marked:</b> {uploadResult.marked}</div>
                <div><b>Already:</b> {uploadResult.alreadyMarked}</div>
                <div><b>Total:</b> {uploadResult.totalRows}</div>

                {uploadResult.invalidRegnums?.length > 0 && (
                  <div style={{ color: "#B91C1C", marginTop: "0.25rem" }}>
                    Invalid: {uploadResult.invalidRegnums.length}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>


    </div>


  );
};

export default Dashboard;
