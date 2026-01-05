import React, { useEffect, useState } from "react";
import axios from "axios";
import Attendancecard from "../components/Attendancecard";
import { ClipboardList, Filter } from "lucide-react";

const Attendance = () => {
  const [events, setevents] = useState([]);
  const [selected_event, setselected_event] = useState("");
  const [attendances, setattendances] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
      });
  }, []);

  useEffect(() => {
    if (!selected_event) {
      setattendances([]);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/attendance/event/${selected_event}`)
      .then((response) => {
        setattendances(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selected_event, refresh]);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Attendance Logs</h1>
          <p className="page-subtitle">View attendance records for events</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Filter size={20} color="var(--text-secondary)" />
          <select
            value={selected_event}
            onChange={(e) => setselected_event(e.target.value)}
            style={{ flex: 1, maxWidth: '400px' }}
          >
            <option value="">-- Select Event to View Attendance --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.eventname}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading records...</div>
      ) : (
        <>
          {!selected_event ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <ClipboardList size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Select an event to see who attended.</p>
            </div>
          ) : attendances.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {attendances.map((attendance) => (
                <Attendancecard key={attendance.id} data={attendance} setrefresh={setrefresh} />
              ))}
              <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Total Present: {attendances.length}
              </div>
            </div>
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No attendance records found for this event.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Attendance;
