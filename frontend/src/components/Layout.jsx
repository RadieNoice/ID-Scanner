import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                {children ? children : <Outlet />}
            </main>
        </div>
    );
};

export default Layout;
