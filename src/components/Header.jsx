import React from 'react';
import { Calendar, Moon, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const Header = ({ theme, onToggleTheme, totalRegistrations }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="brand-title">EventSphere 2026</div>
            <div className="brand-subtitle">Tech Summit & Workshop Portal • ReactJS Client-Side Validation</div>
          </div>
        </div>

        <div className="header-actions">
          <div className="btn-pill-sm no-print" title="Total Confirmed Registrations in this session">
            <CheckCircle2 size={14} color="#10b981" />
            <span><strong>{totalRegistrations}</strong> Registered</span>
          </div>

          <button
            type="button"
            className="btn-icon no-print"
            onClick={onToggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

