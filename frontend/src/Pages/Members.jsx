import React, { useEffect, useState } from "react";
import axios from "axios";
import Membercard from "../components/Membercard";
import { Filter, Users } from "lucide-react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/setmember");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">Manage and view all registered members</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Filter size={18} color="var(--text-secondary)" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ border: 'none', padding: '0', fontSize: '0.9rem', width: 'auto', minWidth: '150px' }}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading members...</div>
      ) : (
        <>
          {filteredMembers.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
              <Users size={48} color="var(--border-color)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>No members found.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {filteredMembers.map((member) => (
                <div key={member.regnum} className="card">
                  <Membercard
                    data={member}
                    refresh={fetchMembers}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Members;
