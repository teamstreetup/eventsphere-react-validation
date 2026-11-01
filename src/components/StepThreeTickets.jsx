import React, { useState } from 'react';
import { Ticket, Check, Sparkles, Tag, AlertCircle, Info } from 'lucide-react';
import { PASS_TIERS, WORKSHOPS, PROMO_CODES } from '../utils/constants';
import { FormField } from './FormField';

export const StepThreeTickets = ({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  pricing
}) => {
  const [promoInput, setPromoInput] = useState(formData.promoCode || '');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(
    formData.promoCode && PROMO_CODES[formData.promoCode]
      ? PROMO_CODES[formData.promoCode].description
      : ''
  );

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Please enter a coupon code.');
      setPromoSuccess('');
      return;
    }

    if (PROMO_CODES[code]) {
      setPromoError('');
      setPromoSuccess(PROMO_CODES[code].description);
      onChange('promoCode', code);
    } else {
      setPromoError('Invalid coupon code. Try STUDENT50, EARLYBIRD, or DEVCON.');
      setPromoSuccess('');
      onChange('promoCode', '');
    }
  };

  const handleRemovePromo = () => {
    setPromoInput('');
    setPromoError('');
    setPromoSuccess('');
    onChange('promoCode', '');
  };

  const handleToggleWorkshop = (wsId) => {
    const current = formData.selectedWorkshops || [];
    let updated;
    if (current.includes(wsId)) {
      updated = current.filter((id) => id !== wsId);
    } else {
      updated = [...current, wsId];
    }
    onChange('selectedWorkshops', updated);
  };

  return (
    <section>
      <div className="form-section-header">
        <h2 className="form-section-title">
          <Ticket size={22} color="#ec4899" />
          Select Summit Pass & Workshop Tracks
        </h2>
        <p className="form-section-desc">
          Choose your access tier and pick between 1 to 3 interactive hands-on workshops.
        </p>
      </div>

      {/* Pass Tier Selection Cards */}
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="field-label">
          <span>
            Pass Tier Selection <span className="req-star">*</span>
          </span>
          <span className="field-hint">Select one tier</span>
        </label>

        <div className="pass-cards-grid">
          {PASS_TIERS.map((tier) => {
            const isSelected = formData.passTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`pass-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onChange('passTier', tier.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onChange('passTier', tier.id);
                  }
                }}
              >
                {tier.badge && <span className="pass-card-badge">{tier.badge}</span>}
                <div className="pass-card-title">{tier.name}</div>
                <div className="pass-card-price">₹{tier.price}</div>
                <ul className="pass-card-features">
                  {tier.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workshop Selection (Group Checkbox Validation) */}
      <FormField
        label="Hands-on Workshop Tracks"
        name="selectedWorkshops"
        required
        hint="Select between 1 to 3 workshops"
        error={errors.selectedWorkshops}
        isTouched={touched.selectedWorkshops}
        isValid={
          !errors.selectedWorkshops &&
          formData.selectedWorkshops &&
          formData.selectedWorkshops.length >= 1 &&
          formData.selectedWorkshops.length <= 3
        }
      >
        <div className="workshops-list">
          {WORKSHOPS.map((ws) => {
            const isSelected = formData.selectedWorkshops?.includes(ws.id);
            return (
              <div
                key={ws.id}
                className={`workshop-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleToggleWorkshop(ws.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleToggleWorkshop(ws.id);
                  }
                }}
              >
                <div className="workshop-info">
                  <div className="workshop-check">
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem' }}>{ws.title}</strong>
                    <div className="workshop-meta">
                      <span className="badge-tag">{ws.category}</span>
                      <span>By {ws.instructor}</span>
                      <span>• {ws.duration}</span>
                      <span style={{ color: '#10b981' }}>{ws.capacity}</span>
                    </div>
                  </div>
                </div>
                <div className="workshop-fee">
                  {formData.passTier === 'vip' ? (
                    <span style={{ color: '#10b981', fontSize: '0.85rem' }}>Included (VIP)</span>
                  ) : (
                    <span>+₹{ws.extraFee}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FormField>

      {/* Preferences Grid */}
      <div className="form-grid" style={{ marginTop: '1.5rem' }}>
        {/* T-Shirt Size */}
        <FormField label="Conference T-Shirt Size" name="tshirtSize">
          <select
            id="tshirtSize"
            name="tshirtSize"
            value={formData.tshirtSize}
            onChange={(e) => onChange('tshirtSize', e.target.value)}
            className="form-select"
          >
            <option value="S">Small (S)</option>
            <option value="M">Medium (M) - Standard</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
            <option value="XXL">Double XL (XXL)</option>
          </select>
        </FormField>

        {/* Dietary Preferences */}
        <FormField label="Networking Lunch Preference" name="dietaryPreference">
          <select
            id="dietaryPreference"
            name="dietaryPreference"
            value={formData.dietaryPreference}
            onChange={(e) => onChange('dietaryPreference', e.target.value)}
            className="form-select"
          >
            <option value="Vegetarian">Pure Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Jain Food">Jain Meal</option>
          </select>
        </FormField>
      </div>

      {/* Dynamic Price Calculation & Coupon Box */}
      <div className="pricing-summary-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sparkles size={18} color="#2563eb" />
          <strong style={{ fontSize: '1rem' }}>Live Pricing & Discount Calculation</strong>
        </div>

        {/* Coupon Code Input */}
        <div className="promo-input-group">
          <div className="input-wrapper" style={{ flex: 1 }}>
            <span className="input-icon-left"><Tag size={16} /></span>
            <input
              type="text"
              placeholder="Promo Code: STUDENT50 / EARLYBIRD"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              className="form-input has-icon-left"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          {formData.promoCode ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleRemovePromo}
              style={{ padding: '0.65rem 1rem' }}
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyPromo}
              style={{ padding: '0.65rem 1.25rem' }}
            >
              Apply
            </button>
          )}
        </div>

        {promoError && (
          <div className="error-msg" style={{ marginBottom: '0.75rem' }}>
            <AlertCircle size={14} />
            <span>{promoError}</span>
          </div>
        )}

        {promoSuccess && (
          <div className="success-hint" style={{ marginBottom: '0.75rem', fontWeight: 600 }}>
            <Sparkles size={14} />
            <span>{promoSuccess}</span>
          </div>
        )}

        {/* Price Breakdown */}
        <div className="summary-row">
          <span>Base Pass ({pricing.tierName}):</span>
          <span>₹{pricing.tierPrice}</span>
        </div>

        <div className="summary-row">
          <span>Workshops ({pricing.workshopCount} selected):</span>
          <span>₹{pricing.workshopsTotal}</span>
        </div>

        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{pricing.subtotal}</span>
        </div>

        {pricing.discountAmount > 0 && (
          <div className="summary-row discount">
            <span>Discount ({formData.promoCode}):</span>
            <span>- ₹{pricing.discountAmount}</span>
          </div>
        )}

        <div className="summary-row total">
          <span>Total Payable Amount:</span>
          <span>₹{pricing.finalTotal}</span>
        </div>
      </div>
    </section>
  );
};

