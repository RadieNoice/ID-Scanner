import React, { useEffect, useState } from "react";
import axios from "axios";
import Eventscard from "../components/Eventscard";
import { Plus, CalendarDays } from "lucide-react";

const Events = () => {
  const [events, setevents] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [createevent, setcreateevent] = useState(false);
  const [newevent, setnewevent] = useState({ name: "", desc: "", date: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/event`)
      .then((response) => {
        setevents(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  const put_event = async () => {
    if (!newevent.name || !newevent.date) {
      alert("Please fill in event name and date");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/event`, {
        eventname: newevent.name,
        eventdesc: newevent.desc,
        date: newevent.date,
      });
      setnewevent({ name: "", desc: "", date: "" });
      setcreateevent(false);
      setrefresh(!refresh);
    } catch (error) {
      alert(error.response?.data || "Error creating event");
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Manage upcoming and past events</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setcreateevent(!createevent)}
        >
          {createevent ? 'Cancel' : <><Plus size={20} /> Create Event</>}
        </button>
      </div>

      {createevent && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Create New Event</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Event Name</label>
              <input
                type="text"
                value={newevent.name}
                onChange={(e) => setnewevent({ ...newevent, name: e.target.value })}
                placeholder="e.g. Annual Tech Symposium"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Date</label>
              <input
                type="date"
                value={newevent.date}
                onChange={(e) => setnewevent({ ...newevent, date: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Description</label>
              <input
                type="text"
                value={newevent.desc}
                onChange={(e) => setnewevent({ ...newevent, desc: e.target.value })}
                placeholder="Brief description of the event"
              />
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={put_event}>Save Event</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading events...</div>
      ) : (
        <>
          {events.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <CalendarDays size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>No events scheduled yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {events.map((event) => (
                <Eventscard key={event.id} data={event} setrefresh={setrefresh} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
