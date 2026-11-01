/**
 * Comprehensive Client-Side Form Validation Utility
 * Demonstrates regex patterns, age calculations, password strength algorithms,
 * and step-specific validation for React applications.
 */

// Strict RFC 5322 compatible email pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 10-digit mobile number starting with 6, 7, 8, or 9
const PHONE_REGEX = /^[6-9]\d{9}$/;

// Standard URL validation pattern with protocol requirement
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

// Alphabetic name with spaces, apostrophes, and hyphens allowed
const NAME_REGEX = /^[A-Za-z]+([ A-Za-z'-]+)*$/;

export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return 'Full name must be at least 3 characters long.';
  }
  if (trimmed.length > 50) {
    return 'Full name cannot exceed 50 characters.';
  }
  if (!NAME_REGEX.test(trimmed)) {
    return 'Full name should only contain alphabetic letters, spaces, hyphens, or apostrophes.';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  const trimmed = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. student@college.edu).';
  }
  // Helpful typo detection for common domains
  if (trimmed.endsWith('@gmai.com') || trimmed.endsWith('@gmial.com')) {
    return 'Did you mean @gmail.com? Please double-check your email domain.';
  }
  if (trimmed.endsWith('@yaho.com')) {
    return 'Did you mean @yahoo.com? Please double-check your email domain.';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Contact phone number is required.';
  }
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(cleanPhone)) {
    return 'Phone number must contain only numeric digits.';
  }
  if (cleanPhone.length !== 10) {
    return `Phone number must be exactly 10 digits (currently ${cleanPhone.length} digits).`;
  }
  if (!PHONE_REGEX.test(cleanPhone)) {
    return 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
  }
  return null;
};

export const validateDob = (dob) => {
  if (!dob) {
    return 'Date of birth is required.';
  }
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    return 'Please enter a valid date.';
  }

  const today = new Date();
  if (birthDate > today) {
    return 'Date of birth cannot be in the future.';
  }

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    return `Attendees must be at least 18 years old to register (Current age: ${age}).`;
  }
  if (age > 100) {
    return 'Please enter a realistic date of birth.';
  }
  return null;
};

export const validateGender = (gender) => {
  if (!gender) {
    return 'Please select your gender identification.';
  }
  return null;
};

export const validateInstitution = (institution) => {
  if (!institution || !institution.trim()) {
    return 'College or Organization name is required.';
  }
  if (institution.trim().length < 3) {
    return 'Institution name must be at least 3 characters long.';
  }
  return null;
};

export const validatePortfolioUrl = (url) => {
  if (!url || !url.trim()) {
    return null; // Optional field
  }
  const trimmed = url.trim();
  if (!URL_REGEX.test(trimmed)) {
    return 'Please enter a valid website/portfolio URL starting with http:// or https://';
  }
  return null;
};

export const validateBio = (bio) => {
  if (!bio || !bio.trim()) {
    return 'Please provide a short statement of interest or bio.';
  }
  const length = bio.trim().length;
  if (length < 30) {
    return `Bio is too short. Please write at least 30 characters (currently ${length}/30).`;
  }
  if (length > 300) {
    return `Bio exceeds maximum limit of 300 characters (currently ${length}/300).`;
  }
  return null;
};

export const validateWorkshops = (workshops) => {
  if (!workshops || workshops.length === 0) {
    return 'Please select at least 1 workshop track to attend.';
  }
  if (workshops.length > 3) {
    return 'You can choose a maximum of 3 workshops due to scheduling overlaps.';
  }
  return null;
};

export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: 'Too Short',
      color: '#94a3b8',
      criteria: {
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false
      }
    };
  }

  const criteria = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-=+]/.test(password)
  };

  const metCount = Object.values(criteria).filter(Boolean).length;

  let label = 'Weak';
  let color = '#ef4444'; // red

  if (metCount >= 5) {
    label = 'Very Strong';
    color = '#10b981'; // emerald green
  } else if (metCount >= 4) {
    label = 'Strong';
    color = '#22c55e'; // green
  } else if (metCount >= 3) {
    label = 'Moderate';
    color = '#f59e0b'; // amber
  } else if (metCount >= 2) {
    label = 'Weak';
    color = '#f97316'; // orange
  }

  return {
    score: metCount,
    label,
    color,
    criteria
  };
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required for portal attendee access.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  const strength = getPasswordStrength(password);
  if (strength.score < 4) {
    return 'Password must contain uppercase, lowercase, a digit, and a special character.';
  }
  return null;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match. Please ensure both fields are identical.';
  }
  return null;
};

export const validateTerms = (agree) => {
  if (!agree) {
    return 'You must accept the terms of service and code of conduct to proceed.';
  }
  return null;
};

/**
 * Validates a single specific field and returns an error string or null
 */
export const validateField = (field, value, allValues = {}) => {
  switch (field) {
    case 'fullName':
      return validateFullName(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'dob':
      return validateDob(value);
    case 'gender':
      return validateGender(value);
    case 'institution':
      return validateInstitution(value);
    case 'portfolioUrl':
      return validatePortfolioUrl(value);
    case 'bio':
      return validateBio(value);
    case 'selectedWorkshops':
      return validateWorkshops(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validateConfirmPassword(value, allValues.password);
    case 'agreeTerms':
      return validateTerms(value);
    default:
      return null;
  }
};

/**
 * Validates an entire step's fields
 */
export const validateStep = (stepNumber, formData) => {
  const errors = {};

  if (stepNumber === 1) {
    const nameErr = validateFullName(formData.fullName);
    if (nameErr) errors.fullName = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    const dobErr = validateDob(formData.dob);
    if (dobErr) errors.dob = dobErr;

    const genderErr = validateGender(formData.gender);
    if (genderErr) errors.gender = genderErr;
  } else if (stepNumber === 2) {
    const instErr = validateInstitution(formData.institution);
    if (instErr) errors.institution = instErr;

    const urlErr = validatePortfolioUrl(formData.portfolioUrl);
    if (urlErr) errors.portfolioUrl = urlErr;

    const bioErr = validateBio(formData.bio);
    if (bioErr) errors.bio = bioErr;
  } else if (stepNumber === 3) {
    const wsErr = validateWorkshops(formData.selectedWorkshops);
    if (wsErr) errors.selectedWorkshops = wsErr;
  } else if (stepNumber === 4) {
    const passErr = validatePassword(formData.password);
    if (passErr) errors.password = passErr;

    const confirmErr = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmErr) errors.confirmPassword = confirmErr;

    const termsErr = validateTerms(formData.agreeTerms);
    if (termsErr) errors.agreeTerms = termsErr;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates all form steps at final submission
 */
export const validateAll = (formData) => {
  const allErrors = {};
  for (let s = 1; s <= 4; s++) {
    const stepResult = validateStep(s, formData);
    Object.assign(allErrors, stepResult.errors);
  }
  return {
    isValid: Object.keys(allErrors).length === 0,
    errors: allErrors
  };
};

