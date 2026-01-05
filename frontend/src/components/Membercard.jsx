import React from "react";
import { User, Building2, CreditCard, Mail } from "lucide-react";

const Membercard = ({ data }) => {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#E0E7FF',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--primary-color)',
        flexShrink: 0
      }}>
        <User size={48} />
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{data.name}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>{data.regnum}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Building2 size={16} color="var(--text-secondary)" />
            <span>{data.college_department || 'N/A'}</span>
          </div>
          {data.college_year && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <CreditCard size={16} color="var(--text-secondary)" />
              <span>Year: {data.college_year}</span>
            </div>
          )}
          {data.vit_email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
              <Mail size={16} color="var(--text-secondary)" />
              <span>{data.vit_email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Membercard;
