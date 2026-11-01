import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Download,
  Printer,
  Users,
  X,
  Sparkles,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import { PASS_TIERS, WORKSHOPS } from '../utils/constants';

export const RegistrationSummaryModal = ({
  registration,
  onClose,
  onRegisterAnother,
  onViewAttendees
}) => {
  useEffect(() => {
    // Launch celebratory confetti animation
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback gracefully if canvas-confetti is not loaded
    }
  }, []);

  if (!registration) return null;

  const passTierObj = PASS_TIERS.find((t) => t.id === registration.passTier);
  const selectedWsList = WORKSHOPS.filter((w) =>
    registration.selectedWorkshops?.includes(w.id)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button
          type="button"
          className="modal-close-btn no-print"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#10b981',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
              boxShadow: '0 0 0 6px rgba(16, 185, 129, 0.15)'
            }}
          >
            <CheckCircle size={32} />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Registration Confirmed!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            A confirmation receipt has been sent to <strong>{registration.email}</strong>.
          </p>
        </div>

        {/* Digital Event Pass Badge */}
        <div className="event-pass-badge" id="printable-pass">
          <div className="pass-glow" />
          
          <div className="pass-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="#60a5fa" />
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#93c5fd', fontWeight: 700 }}>
                  EventSphere 2026 Summit
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                Official Attendee Pass
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="pass-field-label">Badge ID</span>
              <div className="pass-id">{registration.id || 'ES-2026-9481'}</div>
            </div>
          </div>

          <div className="pass-grid">
            <div>
              <span className="pass-field-label">Attendee Name</span>
              <div className="pass-field-value">{registration.fullName}</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{registration.institution}</div>
            </div>

            <div>
              <span className="pass-field-label">Pass Access Tier</span>
              <div className="pass-field-value" style={{ color: '#38bdf8' }}>
                {passTierObj?.name || 'Developer Pass'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                Track: {registration.techTrack}
              </div>
            </div>

            <div>
              <span className="pass-field-label">Date & Venue</span>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: 2 }}>
                <Calendar size={13} color="#94a3b8" />
                <span>Nov 14-16, 2026</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={13} />
                <span>Convention Center & Hybrid Live</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <div className="pass-qr-sim" title="Simulated QR Code for Check-in">
                <QrCode size={52} strokeWidth={2.2} />
                <span style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.05em' }}>VERIFIED</span>
              </div>
            </div>
          </div>

          {selectedWsList.length > 0 && (
            <div style={{ marginTop: '1rem', borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '0.75rem' }}>
              <span className="pass-field-label">Registered Workshops:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                {selectedWsList.map((ws) => (
                  <span
                    key={ws.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 6,
                      fontSize: '0.75rem'
                    }}
                  >
                    {ws.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span>T-Shirt: {registration.tshirtSize} • Meal: {registration.dietaryPreference}</span>
            <span style={{ fontWeight: 700, color: '#34d399' }}>
              Paid: ₹{registration.pricing?.finalTotal || '0'}
            </span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }} className="no-print">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePrint}
            style={{ flex: 1 }}
          >
            <Printer size={16} />
            <span>Print / Save Pass</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onViewAttendees}
          >
            <Users size={16} />
            <span>View All Attendees</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRegisterAnother}
          >
            <span>Register Another</span>
          </button>
        </div>
      </div>
    </div>
  );
};

