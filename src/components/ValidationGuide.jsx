import React from 'react';
import { BookOpen, CheckCircle, ShieldCheck, Cpu, Code2, AlertTriangle, Layers } from 'lucide-react';

export const ValidationGuide = () => {
  return (
    <div className="main-card">
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={24} color="#2563eb" />
          Web Technology (WT) Lab: Client-Side Validation Architecture
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
          Technical summary of all validation schemas, state workflows, and interactive algorithms implemented in this ReactJS application.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Section 1: Input & Regex Validation */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', marginBottom: '0.75rem' }}>
            <Code2 size={18} />
            1. Regex & Pattern Validation
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <li>
              <strong>Full Name:</strong> <code>/^[A-Za-z]+([ A-Za-z'-]+)*$/</code>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Enforces alphabetic characters, minimum 3 to 50 characters, disallows numeric/special symbols.</div>
            </li>
            <li>
              <strong>Email Address:</strong> <code>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]&#123;2,&#125;$/</code>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>RFC 5322 pattern check + custom heuristic typo detection (@gmai.com, @yaho.com).</div>
            </li>
            <li>
              <strong>Phone Number:</strong> <code>/^[6-9]\d&#123;9&#125;$/</code>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Strict 10-digit mobile number starting with valid telecom prefixes (6, 7, 8, 9).</div>
            </li>
            <li>
              <strong>Portfolio / GitHub URL:</strong> <code>/^https?:\/\/(www\.)?[-a-zA-Z0-9...]/</code>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Optional field, but validates protocol and domain structure if entered.</div>
            </li>
          </ul>
        </div>

        {/* Section 2: Temporal & Business Rules */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8b5cf6', marginBottom: '0.75rem' }}>
            <Cpu size={18} />
            2. Temporal & Business Constraints
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <li>
              <strong>Age Calculation (18+ check):</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Computes precise difference between current date and DOB considering month and leap year boundaries. Rejects dates in the future and ages under 18.
              </div>
            </li>
            <li>
              <strong>Workshop Track Constraints:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Multi-selection checkbox group requires minimum 1 workshop and caps selection at maximum 3 to prevent schedule conflicts.
              </div>
            </li>
            <li>
              <strong>Statement of Interest (Character Bounds):</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Enforces min 30 chars and max 300 chars with live real-time character count and dynamic warning states.
              </div>
            </li>
          </ul>
        </div>

        {/* Section 3: Security & Password Verification */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', marginBottom: '0.75rem' }}>
            <ShieldCheck size={18} />
            3. Password Security & Matching
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <li>
              <strong>5-Factor Strength Algorithm:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Calculates score based on length (8+), Uppercase (A-Z), Lowercase (a-z), Digits (0-9), and Special symbols (!@#$%^&*).
              </div>
            </li>
            <li>
              <strong>Visual Strength Meter:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Dynamic color-coded indicator (Red / Orange / Amber / Green) with checklist micro-icons updated on every keystroke.
              </div>
            </li>
            <li>
              <strong>Strict Confirmation Match:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Verifies exact character-by-character equality with the primary password before submission.
              </div>
            </li>
          </ul>
        </div>

        {/* Section 4: Interactive Architecture */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ec4899', marginBottom: '0.75rem' }}>
            <Layers size={18} />
            4. Interactive React Architecture
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <li>
              <strong>Real-Time Dynamic Pricing:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Subtotal, workshop add-ons, and promo code discounts (e.g. <code>STUDENT50</code>, <code>EARLYBIRD</code>, <code>DEVCON</code>) recalculate instantaneously via reactive state hooks.
              </div>
            </li>
            <li>
              <strong>Multi-Step Navigation with Validation Gate:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Progress is gated: users cannot proceed to the next stage unless current step fields pass all validation criteria.
              </div>
            </li>
            <li>
              <strong>Local Persistence:</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Confirmed attendees persist in <code>localStorage</code>, allowing live table search, filter, and JSON export.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

