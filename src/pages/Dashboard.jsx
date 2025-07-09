import { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newSignups: 0,
    activeSessions: 0,
    systemStatus: 'checking'
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 142,
        newSignups: 18,
        activeSessions: 25,
        systemStatus: 'operational'
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">📊</span>
            Dashboard Overview
          </h1>
          <p className="hero-subtitle">
            Welcome back, admin. Here's what's happening today.
          </p>
        </div>
        <div className="hero-actions">
          <button className="refresh-btn">
            <span className="refresh-icon">🔄</span> Refresh Data
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-header">
            <h2 className="metric-title">Total Users</h2>
            <span className="metric-icon">👥</span>
          </div>
          <div className="metric-value">
            {stats.totalUsers.toLocaleString()}
          </div>
          <div className="metric-trend positive">
            <span className="trend-icon">↑</span> 12% from last week
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h2 className="metric-title">New Signups</h2>
            <span className="metric-icon">🆕</span>
          </div>
          <div className="metric-value">
            {stats.newSignups.toLocaleString()}
          </div>
          <div className="metric-trend positive">
            <span className="trend-icon">↑</span> 5% from yesterday
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <h2 className="metric-title">Active Sessions</h2>
            <span className="metric-icon">🌐</span>
          </div>
          <div className="metric-value">
            {stats.activeSessions.toLocaleString()}
          </div>
          <div className="metric-trend neutral">
            <span className="trend-icon">→</span> Stable
          </div>
        </div>

        <div className="metric-card system-health">
          <div className="metric-header">
            <h2 className="metric-title">System Health</h2>
            <span className="metric-icon">⚙️</span>
          </div>
          <div className={`metric-value ${stats.systemStatus}`}>
            {stats.systemStatus === 'operational' ? (
              <>
                <span className="status-icon">✅</span> All systems operational
              </>
            ) : (
              <>
                <span className="status-icon">⏳</span> Checking status...
              </>
            )}
          </div>
          <div className="uptime-stats">
            <span className="uptime-value">99.98%</span> uptime last 30 days
          </div>
        </div>
      </div>
    </div>
  );
}