import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { FormField } from './FormField';

export const StepOnePersonal = ({ formData, errors, touched, onChange, onBlur }) => {
  return (
    <section>
      <div className="form-section-header">
        <h2 className="form-section-title">
          <User size={22} color="#3b82f6" />
          Attendee Personal Information
        </h2>
        <p className="form-section-desc">
          Please provide your legal identity and contact details for the summit badge issuance.
        </p>
      </div>

      <div className="form-grid">
        {/* Full Name */}
        <FormField
          label="Full Name"
          name="fullName"
          required
          hint="Min 3 characters, alphabets only"
          error={errors.fullName}
          isTouched={touched.fullName}
          isValid={!errors.fullName && formData.fullName.length >= 3}
          className="col-span-2"
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><User size={16} /></span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              onBlur={() => onBlur('fullName')}
              className={`form-input has-icon-left ${
                touched.fullName && errors.fullName ? 'error' : ''
              } ${touched.fullName && !errors.fullName && formData.fullName ? 'valid' : ''}`}
              autoComplete="name"
            />
          </div>
        </FormField>

        {/* Email Address */}
        <FormField
          label="Email Address"
          name="email"
          required
          hint="Registration confirmation & digital pass will be sent here"
          error={errors.email}
          isTouched={touched.email}
          isValid={!errors.email && formData.email.length > 5}
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Mail size={16} /></span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. aarav.sharma@domain.com"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={() => onBlur('email')}
              className={`form-input has-icon-left ${
                touched.email && errors.email ? 'error' : ''
              } ${touched.email && !errors.email && formData.email ? 'valid' : ''}`}
              autoComplete="email"
            />
          </div>
        </FormField>

        {/* Phone Number */}
        <FormField
          label="Mobile Phone Number"
          name="phone"
          required
          hint="10-digit number (e.g. 9876543210)"
          error={errors.phone}
          isTouched={touched.phone}
          isValid={!errors.phone && formData.phone.length === 10}
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Phone size={16} /></span>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, ''))}
              onBlur={() => onBlur('phone')}
              className={`form-input has-icon-left ${
                touched.phone && errors.phone ? 'error' : ''
              } ${touched.phone && !errors.phone && formData.phone ? 'valid' : ''}`}
              autoComplete="tel"
            />
          </div>
        </FormField>

        {/* Date of Birth */}
        <FormField
          label="Date of Birth"
          name="dob"
          required
          hint="Must be at least 18 years old"
          error={errors.dob}
          isTouched={touched.dob}
          isValid={!errors.dob && formData.dob}
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Calendar size={16} /></span>
            <input
              id="dob"
              name="dob"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={formData.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              onBlur={() => onBlur('dob')}
              className={`form-input has-icon-left ${
                touched.dob && errors.dob ? 'error' : ''
              } ${touched.dob && !errors.dob && formData.dob ? 'valid' : ''}`}
            />
          </div>
        </FormField>

        {/* Gender Selection */}
        <FormField
          label="Gender Identification"
          name="gender"
          required
          error={errors.gender}
          isTouched={touched.gender}
          isValid={!errors.gender && formData.gender}
        >
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            onBlur={() => onBlur('gender')}
            className={`form-select ${
              touched.gender && errors.gender ? 'error' : ''
            } ${touched.gender && !errors.gender && formData.gender ? 'valid' : ''}`}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </FormField>
      </div>
    </section>
  );
};
