import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, ClipboardCheck } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { to: '/', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/events', label: 'Events', icon: Calendar },
        { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
        { to: '/members', label: 'Members', icon: Users },
    ];

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            backgroundColor: 'white',
            borderRight: '1px solid var(--border-color)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
        }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>ID</div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ID Scanner</h1>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            isActive ? 'nav-link active' : 'nav-link'
                        }
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none',
                            color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                            backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                            fontWeight: isActive ? 600 : 500,
                            transition: 'all 0.2s'
                        })}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>&copy; 2025 ID OCR</p>
            </div>
        </aside>
    );
};

export default Sidebar;
