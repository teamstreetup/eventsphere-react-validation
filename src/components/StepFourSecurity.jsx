import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Check, X, Lock, CheckCircle2 } from 'lucide-react';
import { FormField } from './FormField';
import { getPasswordStrength } from '../utils/validation';
import { WORKSHOPS, PASS_TIERS } from '../utils/constants';

export const StepFourSecurity = ({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  pricing
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);
  const selectedTier = PASS_TIERS.find((t) => t.id === formData.passTier);
  const selectedWsObjects = WORKSHOPS.filter((w) =>
    formData.selectedWorkshops?.includes(w.id)
  );

  return (
    <section>
      <div className="form-section-header">
        <h2 className="form-section-title">
          <ShieldCheck size={22} color="#10b981" />
          Account Security & Final Review
        </h2>
        <p className="form-section-desc">
          Set up credentials for your attendee portal account and review your registration summary before confirmation.
        </p>
      </div>

      <div className="form-grid">
        {/* Password */}
        <FormField
          label="Portal Access Password"
          name="password"
          required
          hint="Min 8 characters with mixed case, numbers & symbols"
          error={errors.password}
          isTouched={touched.password}
          isValid={!errors.password && passwordStrength.score >= 4}
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Lock size={16} /></span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter strong password"
              value={formData.password}
              onChange={(e) => onChange('password', e.target.value)}
              onBlur={() => onBlur('password')}
              className={`form-input has-icon-left has-icon-right ${
                touched.password && errors.password ? 'error' : ''
              } ${touched.password && !errors.password && formData.password ? 'valid' : ''}`}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="btn-icon input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{ border: 'none', background: 'transparent', width: 32, height: 32 }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Real-time Password Strength Meter */}
          {formData.password && (
            <div className="password-strength-container">
              <div className="strength-header">
                <span>Password Strength:</span>
                <strong style={{ color: passwordStrength.color }}>
                  {passwordStrength.label} ({passwordStrength.score}/5)
                </strong>
              </div>
              <div className="strength-meter-bar">
                <div
                  className="strength-meter-fill"
                  style={{
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    backgroundColor: passwordStrength.color
                  }}
                />
              </div>
              <ul className="criteria-list">
                <li className={`criteria-item ${passwordStrength.criteria.length ? 'met' : ''}`}>
                  {passwordStrength.criteria.length ? <Check size={13} /> : <X size={13} />}
                  <span>8+ characters</span>
                </li>
                <li className={`criteria-item ${passwordStrength.criteria.upper ? 'met' : ''}`}>
                  {passwordStrength.criteria.upper ? <Check size={13} /> : <X size={13} />}
                  <span>Uppercase (A-Z)</span>
                </li>
                <li className={`criteria-item ${passwordStrength.criteria.lower ? 'met' : ''}`}>
                  {passwordStrength.criteria.lower ? <Check size={13} /> : <X size={13} />}
                  <span>Lowercase (a-z)</span>
                </li>
                <li className={`criteria-item ${passwordStrength.criteria.number ? 'met' : ''}`}>
                  {passwordStrength.criteria.number ? <Check size={13} /> : <X size={13} />}
                  <span>Number (0-9)</span>
                </li>
                <li className={`criteria-item ${passwordStrength.criteria.special ? 'met' : ''}`}>
                  {passwordStrength.criteria.special ? <Check size={13} /> : <X size={13} />}
                  <span>Special symbol (!@#$)</span>
                </li>
              </ul>
            </div>
          )}
        </FormField>

        {/* Confirm Password */}
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          required
          hint="Re-type your password"
          error={errors.confirmPassword}
          isTouched={touched.confirmPassword}
          isValid={
            !errors.confirmPassword &&
            formData.confirmPassword &&
            formData.confirmPassword === formData.password
          }
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Lock size={16} /></span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              onBlur={() => onBlur('confirmPassword')}
              className={`form-input has-icon-left has-icon-right ${
                touched.confirmPassword && errors.confirmPassword ? 'error' : ''
              } ${
                touched.confirmPassword &&
                !errors.confirmPassword &&
                formData.confirmPassword
                  ? 'valid'
                  : ''
              }`}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="btn-icon input-icon-right"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              style={{ border: 'none', background: 'transparent', width: 32, height: 32 }}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </FormField>

        {/* Live Registration Review Summary Card */}
        <div className="col-span-2" style={{ marginTop: '1rem' }}>
          <div className="pricing-summary-box" style={{ marginTop: 0 }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#10b981" />
              Registration Verification Summary
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Attendee:</span>
                <div><strong>{formData.fullName || 'Not specified'}</strong></div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Email:</span>
                <div><strong>{formData.email || 'Not specified'}</strong></div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Pass Tier:</span>
                <div><strong>{selectedTier?.name || 'Developer Pass'} (₹{pricing.tierPrice})</strong></div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Tech Track:</span>
                <div><strong>{formData.techTrack}</strong></div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--text-muted)' }}>Workshops ({selectedWsObjects.length}):</span>
                <div>
                  <strong>
                    {selectedWsObjects.map((w) => w.title).join(' • ') || 'None selected'}
                  </strong>
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>Total Final Payable:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>₹{pricing.finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="col-span-2" style={{ marginTop: '0.75rem' }}>
          <FormField
            name="agreeTerms"
            required
            error={errors.agreeTerms}
            isTouched={touched.agreeTerms}
          >
            <label className="custom-checkbox-label">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => onChange('agreeTerms', e.target.checked)}
                onBlur={() => onBlur('agreeTerms')}
                className="custom-checkbox-input"
              />
              <span>
                I agree to the <strong>EventSphere Code of Conduct</strong>, safety guidelines, and refund policy. I certify that the information entered is accurate. <span className="req-star">*</span>
              </span>
            </label>
          </FormField>
        </div>

        {/* Newsletter Checkbox (Optional) */}
        <div className="col-span-2">
          <label className="custom-checkbox-label">
            <input
              id="agreeNewsletter"
              name="agreeNewsletter"
              type="checkbox"
              checked={formData.agreeNewsletter}
              onChange={(e) => onChange('agreeNewsletter', e.target.checked)}
              className="custom-checkbox-input"
            />
            <span>
              Send me keynote updates, speaker slides, and future tech summit announcements.
            </span>
          </label>
        </div>
      </div>
    </section>
  );
};

