import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  AlertTriangle,
  FileCheck,
  Users,
  BookOpen
} from 'lucide-react';

import { Header } from './components/Header';
import { StepProgressBar } from './components/StepProgressBar';
import { StepOnePersonal } from './components/StepOnePersonal';
import { StepTwoProfile } from './components/StepTwoProfile';
import { StepThreeTickets } from './components/StepThreeTickets';
import { StepFourSecurity } from './components/StepFourSecurity';
import { RegistrationSummaryModal } from './components/RegistrationSummaryModal';
import { AttendeesList } from './components/AttendeesList';
import { ValidationGuide } from './components/ValidationGuide';

import {
  INITIAL_FORM_DATA,
  SAMPLE_VALID_USER,
  PASS_TIERS,
  WORKSHOPS,
  PROMO_CODES
} from './utils/constants';

import {
  validateField,
  validateStep,
  validateAll
} from './utils/validation';

export function App() {
  // Theme state (Dark/Light mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eventsphere_theme') || 'dark';
  });

  // Active top navigation tab
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'attendees' | 'guide'

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [stepErrorBanner, setStepErrorBanner] = useState('');

  // Persisted confirmed registrations
  const [attendees, setAttendees] = useState(() => {
    try {
      const saved = localStorage.getItem('eventsphere_attendees');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active modal for newly completed registration
  const [submittedRegistration, setSubmittedRegistration] = useState(null);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eventsphere_theme', theme);
  }, [theme]);

  // Sync attendees with localStorage
  useEffect(() => {
    localStorage.setItem('eventsphere_attendees', JSON.stringify(attendees));
  }, [attendees]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Live dynamic pricing calculation
  const pricing = useMemo(() => {
    const tier = PASS_TIERS.find((t) => t.id === formData.passTier) || PASS_TIERS[0];
    const isVip = tier.id === 'vip';

    const selectedWs = WORKSHOPS.filter((w) =>
      formData.selectedWorkshops?.includes(w.id)
    );

    const workshopsTotal = isVip
      ? 0
      : selectedWs.reduce((sum, w) => sum + (w.extraFee || 0), 0);

    const subtotal = tier.price + workshopsTotal;

    let discountAmount = 0;
    const promo = PROMO_CODES[formData.promoCode];
    if (promo) {
      if (promo.type === 'percent') {
        discountAmount = Math.round((subtotal * promo.value) / 100);
      } else if (promo.type === 'flat') {
        discountAmount = Math.min(promo.value, subtotal);
      }
    }

    const finalTotal = Math.max(0, subtotal - discountAmount);

    return {
      tierName: tier.name,
      tierPrice: tier.price,
      workshopCount: selectedWs.length,
      workshopsTotal,
      subtotal,
      discountAmount,
      finalTotal
    };
  }, [formData.passTier, formData.selectedWorkshops, formData.promoCode]);

  // Handle individual field change with live real-time validation
  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [fieldName]: value };

      // Real-time error check
      const fieldError = validateField(fieldName, value, updated);
      setErrors((prevErr) => ({
        ...prevErr,
        [fieldName]: fieldError
      }));

      // If user is editing confirmPassword or password, revalidate confirmPassword
      if (fieldName === 'password' && touched.confirmPassword) {
        const confirmErr = validateField('confirmPassword', updated.confirmPassword, updated);
        setErrors((prevErr) => ({
          ...prevErr,
          confirmPassword: confirmErr
        }));
      }

      return updated;
    });

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true
    }));

    if (stepErrorBanner) {
      setStepErrorBanner('');
    }
  };

  // Handle blur event
  const handleFieldBlur = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true
    }));

    const fieldError = validateField(fieldName, formData[fieldName], formData);
    setErrors((prevErr) => ({
      ...prevErr,
      [fieldName]: fieldError
    }));
  };

  // Advance to next step with validation gate
  const handleNextStep = () => {
    const { isValid, errors: stepErrors } = validateStep(currentStep, formData);

    if (!isValid) {
      // Mark all fields in current step as touched to reveal red error alerts
      const updatedTouched = { ...touched };
      Object.keys(stepErrors).forEach((field) => {
        updatedTouched[field] = true;
      });
      setTouched(updatedTouched);
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      setStepErrorBanner('Please correct all validation errors above before proceeding.');
      return;
    }

    setStepErrorBanner('');
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to previous step
  const handlePrevStep = () => {
    setStepErrorBanner('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step bar click
  const handleStepClick = (stepId) => {
    if (completedSteps.includes(stepId) || stepId <= currentStep) {
      setStepErrorBanner('');
      setCurrentStep(stepId);
    }
  };

  // Final Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: allErrors } = validateAll(formData);

    if (!isValid) {
      const allTouched = {};
      Object.keys(allErrors).forEach((k) => {
        allTouched[k] = true;
      });
      setTouched((prev) => ({ ...prev, ...allTouched }));
      setErrors(allErrors);
      setStepErrorBanner('Form contains validation errors. Please review all steps.');
      return;
    }

    // Build confirmed registration record
    const registrationRecord = {
      ...formData,
      id: `ES-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredAt: new Date().toISOString(),
      pricing
    };

    setAttendees((prev) => [registrationRecord, ...prev]);
    setSubmittedRegistration(registrationRecord);
    setStepErrorBanner('');

    // Reset current form for clean slate
    setFormData(INITIAL_FORM_DATA);
    setTouched({});
    setErrors({});
    setCompletedSteps([]);
    setCurrentStep(1);
  };

  // Fill sample data for quick demonstration during viva / evaluation
  const handleFillSample = (isValidSample = true) => {
    if (isValidSample) {
      setFormData(SAMPLE_VALID_USER);
      setTouched({});
      setErrors({});
      setCompletedSteps([1, 2, 3]);
      setStepErrorBanner('');
    } else {
      // Deliberately trigger sample invalid inputs to showcase error messages
      setFormData({
        fullName: 'A1', // Invalid: < 3 chars, contains digit
        email: 'bad-email@gmai.com', // Invalid: common typo warning
        phone: '12345', // Invalid: < 10 digits & wrong prefix
        dob: '2020-05-10', // Invalid: Under 18 years old
        gender: '', // Invalid: Required
        institution: 'A', // Invalid: < 3 chars
        designation: 'Student',
        techTrack: 'Full-Stack Web & Mobile Development',
        portfolioUrl: 'invalid-url-without-protocol', // Invalid URL
        bio: 'Too short', // Invalid: < 30 chars
        passTier: 'developer',
        selectedWorkshops: [], // Invalid: Minimum 1 required
        tshirtSize: 'M',
        dietaryPreference: 'Vegetarian',
        promoCode: 'INVALIDCODE', // Invalid coupon
        password: 'pass', // Invalid: < 8 chars, missing rules
        confirmPassword: 'mismatch-pass', // Invalid: mismatch
        agreeTerms: false // Invalid: Must agree
      });

      // Mark all touched to display every single validator
      const allTouched = {
        fullName: true,
        email: true,
        phone: true,
        dob: true,
        gender: true,
        institution: true,
        portfolioUrl: true,
        bio: true,
        selectedWorkshops: true,
        password: true,
        confirmPassword: true,
        agreeTerms: true
      };
      setTouched(allTouched);

      // Validate all
      const { errors: invalidErrors } = validateAll({
        fullName: 'A1',
        email: 'bad-email@gmai.com',
        phone: '12345',
        dob: '2020-05-10',
        gender: '',
        institution: 'A',
        portfolioUrl: 'invalid-url-without-protocol',
        bio: 'Too short',
        selectedWorkshops: [],
        password: 'pass',
        confirmPassword: 'mismatch-pass',
        agreeTerms: false
      });
      setErrors(invalidErrors);
      setStepErrorBanner('Populated invalid test data: Inspect all highlighted error states below!');
    }
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form fields?')) {
      setFormData(INITIAL_FORM_DATA);
      setTouched({});
      setErrors({});
      setCompletedSteps([]);
      setCurrentStep(1);
      setStepErrorBanner('');
    }
  };

  const handleClearAttendees = () => {
    if (window.confirm('Are you sure you want to clear all stored attendee registrations?')) {
      setAttendees([]);
      localStorage.removeItem('eventsphere_attendees');
    }
  };

  return (
    <div>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        totalRegistrations={attendees.length}
      />

      <main className="app-container">
        {/* Top Tab Navigation */}
        <nav className="nav-tabs no-print" aria-label="Application Tabs">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <Sparkles size={16} />
            <span>Summit Registration Portal</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'attendees' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendees')}
          >
            <Users size={16} />
            <span>Confirmed Attendees</span>
            {attendees.length > 0 && (
              <span className="tab-badge">{attendees.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            <BookOpen size={16} />
            <span>Validation Architecture Guide</span>
          </button>
        </nav>

        {/* Tab 1: Registration Form */}
        {activeTab === 'register' && (
          <div>
            {/* Quick Fill / Test Evaluation Bar */}
            <div className="quick-fill-bar no-print">
              <div className="quick-fill-info">
                <FileCheck size={16} color="#3b82f6" />
                <span>
                  <strong>Interactive Evaluation Sandbox:</strong> Test client-side validation rules in real-time.
                </span>
              </div>
              <div className="quick-fill-actions">
                <button
                  type="button"
                  className="btn-pill-sm"
                  onClick={() => handleFillSample(true)}
                  title="Auto-fill form with a fully valid attendee profile"
                >
                  <CheckCircle size={13} color="#10b981" />
                  <span>Fill Valid Data</span>
                </button>
                <button
                  type="button"
                  className="btn-pill-sm"
                  onClick={() => handleFillSample(false)}
                  title="Auto-fill intentionally invalid inputs to showcase all error validations"
                  style={{ color: 'var(--danger)' }}
                >
                  <AlertTriangle size={13} color="#ef4444" />
                  <span>Test Error States</span>
                </button>
                <button
                  type="button"
                  className="btn-pill-sm"
                  onClick={handleReset}
                  title="Clear and reset all form fields"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Form Card */}
            <div className="main-card">
              <StepProgressBar
                currentStep={currentStep}
                onStepClick={handleStepClick}
                completedSteps={completedSteps}
              />

              {stepErrorBanner && (
                <div
                  className="error-msg shake-animation"
                  style={{
                    backgroundColor: 'var(--danger-bg)',
                    border: '1px solid var(--danger-border)',
                    padding: '0.75rem 1rem',
                    borderRadius: 10,
                    marginBottom: '1.5rem',
                    fontSize: '0.88rem'
                  }}
                  role="alert"
                >
                  <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                  <span>{stepErrorBanner}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {currentStep === 1 && (
                  <StepOnePersonal
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwoProfile
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                  />
                )}

                {currentStep === 3 && (
                  <StepThreeTickets
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    pricing={pricing}
                  />
                )}

                {currentStep === 4 && (
                  <StepFourSecurity
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    pricing={pricing}
                  />
                )}

                {/* Form Step Navigation Buttons */}
                <div className="form-navigation-actions no-print">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handlePrevStep}
                    >
                      <ArrowLeft size={16} />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleNextStep}
                    >
                      <span>Continue to Step {currentStep + 1}</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      <CheckCircle size={18} />
                      <span>Confirm & Generate Digital Pass</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Confirmed Attendees Directory */}
        {activeTab === 'attendees' && (
          <AttendeesList
            attendees={attendees}
            onClearAll={handleClearAttendees}
            onRegisterNew={() => {
              setActiveTab('register');
              setCurrentStep(1);
            }}
          />
        )}

        {/* Tab 3: Lab Evaluation Guide */}
        {activeTab === 'guide' && <ValidationGuide />}
      </main>

      {/* Confirmation & Ticket Modal */}
      {submittedRegistration && (
        <RegistrationSummaryModal
          registration={submittedRegistration}
          onClose={() => setSubmittedRegistration(null)}
          onRegisterAnother={() => {
            setSubmittedRegistration(null);
            setActiveTab('register');
            setCurrentStep(1);
          }}
          onViewAttendees={() => {
            setSubmittedRegistration(null);
            setActiveTab('attendees');
          }}
        />
      )}
    </div>
  );
}

export default App;
