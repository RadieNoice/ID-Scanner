import React from "react";
import { Calendar, Trash2 } from "lucide-react";
import axios from "axios";

const Eventscard = ({ data, setrefresh }) => {

  const deleteEvent = async () => {
    if (window.confirm(`Are you sure you want to delete "${data.eventname}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/event/${data.id}`);
        setrefresh((prev) => !prev);
      } catch (error) {
        console.error("Error deleting event", error);
        alert("Failed to delete event");
      }
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{data.eventname}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <Calendar size={16} />
          <span>{formatDate(data.date)}</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {data.eventdesc || "No description provided."}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={deleteEvent}
          className="btn btn-outline"
          style={{ padding: '0.5rem', color: '#EF4444', borderColor: '#FECACA' }}
          title="Delete Event"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Eventscard;
