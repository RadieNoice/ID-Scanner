import React from "react";
import Membercard from "./Membercard";
import { Trash2, Clock } from "lucide-react";
import axios from "axios";

const Attendancecard = ({ data, setrefresh }) => {
  const deleteattendance = async () => {
    if (window.confirm("Remove this attendance record?")) {
      await axios
        .delete(`http://localhost:8080/api/attendance/${data.id}`)
        .then((response) => {
          setrefresh((prev) => !prev);
        })
        .catch((error) => {
          alert("Error deleting record");
        });
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={14} />
          <span>Marked: {formatTime(data.markedAt)}</span>
        </div>
        {/* Reuse Membercard but maybe scale it down or wrap it? 
             Membercard is a bit large. Let's extract just the simplified info or use Membercard if it fits. 
             Membercard is flex. */}
        <div style={{ transform: 'scale(0.9)', transformOrigin: 'left top' }}>
          <Membercard data={data.member} />
        </div>
      </div>

      <button
        onClick={deleteattendance}
        className="btn btn-outline"
        style={{ padding: '0.5rem', color: '#EF4444', borderColor: '#FECACA', alignSelf: 'flex-start' }}
        title="Delete Record"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default Attendancecard;
