import React from 'react';
import { Briefcase, Building, Compass, Globe, FileText } from 'lucide-react';
import { FormField } from './FormField';
import { TECH_TRACKS } from '../utils/constants';

export const StepTwoProfile = ({ formData, errors, touched, onChange, onBlur }) => {
  const bioLength = formData.bio ? formData.bio.trim().length : 0;
  const isBioLengthValid = bioLength >= 30 && bioLength <= 300;

  return (
    <section>
      <div className="form-section-header">
        <h2 className="form-section-title">
          <Briefcase size={22} color="#8b5cf6" />
          Academic & Professional Profile
        </h2>
        <p className="form-section-desc">
          Tell us about your background, institution, and what domain tracks you are excited to explore.
        </p>
      </div>

      <div className="form-grid">
        {/* College / Organization */}
        <FormField
          label="College / Organization Name"
          name="institution"
          required
          hint="University, Institute or Employer name"
          error={errors.institution}
          isTouched={touched.institution}
          isValid={!errors.institution && formData.institution.length >= 3}
          className="col-span-2"
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Building size={16} /></span>
            <input
              id="institution"
              name="institution"
              type="text"
              placeholder="e.g. Pune Institute of Computer Technology / Google"
              value={formData.institution}
              onChange={(e) => onChange('institution', e.target.value)}
              onBlur={() => onBlur('institution')}
              className={`form-input has-icon-left ${
                touched.institution && errors.institution ? 'error' : ''
              } ${touched.institution && !errors.institution && formData.institution ? 'valid' : ''}`}
            />
          </div>
        </FormField>

        {/* Designation / Role */}
        <FormField
          label="Current Designation / Role"
          name="designation"
          required
        >
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={(e) => onChange('designation', e.target.value)}
            className="form-select"
          >
            <option value="Student">Undergraduate / Graduate Student</option>
            <option value="Junior Developer">Junior Developer (0-2 yrs)</option>
            <option value="Senior Developer">Senior Software Engineer (3+ yrs)</option>
            <option value="Tech Lead / Architect">Tech Lead / Solution Architect</option>
            <option value="Researcher / Academic">Academic Faculty / Researcher</option>
            <option value="Founder / Executive">Tech Founder / Product Manager</option>
          </select>
        </FormField>

        {/* Primary Tech Track */}
        <FormField
          label="Primary Tech Track"
          name="techTrack"
          required
          hint="Keynotes and networking will prioritize this track"
        >
          <div className="input-wrapper">
            <select
              id="techTrack"
              name="techTrack"
              value={formData.techTrack}
              onChange={(e) => onChange('techTrack', e.target.value)}
              className="form-select"
            >
              {TECH_TRACKS.map((track) => (
                <option key={track} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>
        </FormField>

        {/* Portfolio / GitHub URL (Optional with regex validation) */}
        <FormField
          label="Portfolio or GitHub / LinkedIn URL"
          name="portfolioUrl"
          hint="Optional (Must include https:// if entered)"
          error={errors.portfolioUrl}
          isTouched={touched.portfolioUrl}
          isValid={!errors.portfolioUrl && formData.portfolioUrl.length > 0}
          className="col-span-2"
        >
          <div className="input-wrapper">
            <span className="input-icon-left"><Globe size={16} /></span>
            <input
              id="portfolioUrl"
              name="portfolioUrl"
              type="url"
              placeholder="https://github.com/yourusername or https://portfolio.dev"
              value={formData.portfolioUrl}
              onChange={(e) => onChange('portfolioUrl', e.target.value)}
              onBlur={() => onBlur('portfolioUrl')}
              className={`form-input has-icon-left ${
                touched.portfolioUrl && errors.portfolioUrl ? 'error' : ''
              } ${touched.portfolioUrl && !errors.portfolioUrl && formData.portfolioUrl ? 'valid' : ''}`}
            />
          </div>
        </FormField>

        {/* Motivation / Short Bio */}
        <FormField
          label="Statement of Interest / Bio"
          name="bio"
          required
          hint="Min 30 characters, Max 300 characters"
          error={errors.bio}
          isTouched={touched.bio}
          isValid={!errors.bio && isBioLengthValid}
          className="col-span-2"
        >
          <textarea
            id="bio"
            name="bio"
            placeholder="Describe what projects you are building, technologies you want to master, or why you want to attend EventSphere 2026..."
            value={formData.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            onBlur={() => onBlur('bio')}
            className={`form-textarea ${
              touched.bio && errors.bio ? 'error' : ''
            } ${touched.bio && !errors.bio && isBioLengthValid ? 'valid' : ''}`}
          />
          <div className={`char-counter ${bioLength < 30 ? 'warning' : isBioLengthValid ? 'valid' : 'warning'}`}>
            <span>{bioLength} / 300 characters</span>
            {bioLength < 30 && <span> ({30 - bioLength} more needed)</span>}
          </div>
        </FormField>
      </div>
    </section>
  );
};
