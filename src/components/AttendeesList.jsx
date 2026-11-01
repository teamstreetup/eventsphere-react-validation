import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, Download, UserCheck, Ticket, IndianRupee, Sparkles } from 'lucide-react';
import { PASS_TIERS, WORKSHOPS } from '../utils/constants';

export const AttendeesList = ({ attendees, onClearAll, onRegisterNew }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('all');

  const filteredAttendees = useMemo(() => {
    return attendees.filter((item) => {
      const matchesSearch =
        item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.institution?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = filterTier === 'all' || item.passTier === filterTier;

      return matchesSearch && matchesTier;
    });
  }, [attendees, searchQuery, filterTier]);

  const totalRevenue = useMemo(() => {
    return attendees.reduce((acc, curr) => acc + (curr.pricing?.finalTotal || 0), 0);
  }, [attendees]);

  const exportToJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attendees, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `eventsphere-attendees-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="main-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={24} color="#3b82f6" />
            Confirmed Summit Registrations
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Real-time local database of successfully validated and confirmed attendees.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {attendees.length > 0 && (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={exportToJson}
                title="Export registered attendees as JSON file"
              >
                <Download size={15} />
                <span>Export JSON</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClearAll}
                title="Clear all stored registrations"
                style={{ color: 'var(--danger)' }}
              >
                <Trash2 size={15} />
                <span>Clear List</span>
              </button>
            </>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onRegisterNew}
          >
            <span>+ New Registration</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Attendees
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            {attendees.length}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Revenue Collected
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Student Passes
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#8b5cf6', marginTop: '0.2rem' }}>
            {attendees.filter((a) => a.passTier === 'student').length}
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div className="input-wrapper" style={{ flex: '1 1 280px' }}>
          <span className="input-icon-left"><Search size={16} /></span>
          <input
            type="text"
            placeholder="Search by name, email, or institution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input has-icon-left"
          />
        </div>

        <div style={{ minWidth: 180 }}>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="form-select"
          >
            <option value="all">All Pass Tiers</option>
            <option value="student">Student Pass</option>
            <option value="developer">Developer Pass</option>
            <option value="vip">VIP Pass</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredAttendees.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
          <Sparkles size={36} style={{ margin: '0 auto 0.75rem auto', color: 'var(--border-focus)' }} />
          <h3>No confirmed attendees found</h3>
          <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
            {attendees.length === 0
              ? 'Complete a registration to see attendee badges and metrics populate here.'
              : 'Try clearing your search filters.'}
          </p>
        </div>
      ) : (
        <div className="attendees-table-container">
          <table className="attendees-table">
            <thead>
              <tr>
                <th>Attendee ID</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Institution</th>
                <th>Track</th>
                <th>Tier</th>
                <th>Workshops</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((att) => {
                const tier = PASS_TIERS.find((t) => t.id === att.passTier);
                return (
                  <tr key={att.id}>
                    <td>
                      <code style={{ fontSize: '0.78rem', background: 'var(--bg-secondary)', padding: '0.15rem 0.4rem', borderRadius: 4 }}>
                        {att.id}
                      </code>
                    </td>
                    <td>
                      <strong>{att.fullName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{att.gender}</div>
                    </td>
                    <td>
                      <div>{att.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{att.phone}</div>
                    </td>
                    <td>{att.institution}</td>
                    <td>
                      <span className="badge-tag">{att.techTrack}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: tier?.color || 'var(--primary)' }}>
                        {tier?.name || att.passTier}
                      </span>
                    </td>
                    <td>
                      <span className="badge-tag">
                        {att.selectedWorkshops?.length || 0} tracks
                      </span>
                    </td>
                    <td>
                      <strong>₹{att.pricing?.finalTotal || 0}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

