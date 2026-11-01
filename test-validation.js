/**
 * Automated Test Suite for Client-Side Validation
 * Tests all boundary conditions, regex patterns, and security constraints
 */

import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateDob,
  validateInstitution,
  validateBio,
  validateWorkshops,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
  validateStep,
  validateAll
} from './src/utils/validation.js';

import { SAMPLE_VALID_USER } from './src/utils/constants.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('  EventSphere 2026 - Client-Side Validation Tests');
console.log('====================================================\n');

// 1. Full Name Validation Tests
console.log('[1] Full Name Validation:');
assert(validateFullName('Aarav Sharma') === null, 'Valid alphabetic full name accepted');
assert(validateFullName('Jo') !== null, 'Rejects names shorter than 3 characters');
assert(validateFullName('') !== null, 'Rejects empty name');
assert(validateFullName('Aarav123') !== null, 'Rejects names with digits');
assert(validateFullName('Jane O\'Connor-Smith') === null, 'Accepts apostrophes and hyphens');

// 2. Email Validation Tests
console.log('\n[2] Email Validation:');
assert(validateEmail('student@college.edu') === null, 'Valid standard email accepted');
assert(validateEmail('user@sub.domain.co.in') === null, 'Valid subdomain email accepted');
assert(validateEmail('invalid-email') !== null, 'Rejects email without @ or domain');
assert(validateEmail('user@') !== null, 'Rejects missing domain');
assert(validateEmail('user@gmai.com') !== null, 'Flags common domain typo (@gmai.com)');
assert(validateEmail('') !== null, 'Rejects empty email');

// 3. Phone Number Validation Tests
console.log('\n[3] Mobile Phone Number Validation:');
assert(validatePhone('9876543210') === null, 'Valid 10-digit number starting with 9 accepted');
assert(validatePhone('7012345678') === null, 'Valid 10-digit number starting with 7 accepted');
assert(validatePhone('1234567890') !== null, 'Rejects invalid telecom prefix starting with 1');
assert(validatePhone('987654321') !== null, 'Rejects 9-digit number (too short)');
assert(validatePhone('98765432100') !== null, 'Rejects 11-digit number (too long)');
assert(validatePhone('98765abcde') !== null, 'Rejects non-numeric phone');

// 4. Date of Birth & Age Validation Tests
console.log('\n[4] Date of Birth & Age (18+) Validation:');
assert(validateDob('2000-01-15') === null, 'Valid adult birth date (age > 18) accepted');
assert(validateDob('2020-05-10') !== null, 'Rejects minor under 18 years of age');
assert(validateDob('2030-01-01') !== null, 'Rejects future date');
assert(validateDob('') !== null, 'Rejects empty date of birth');

// 5. College / Institution Validation Tests
console.log('\n[5] Institution Validation:');
assert(validateInstitution('MIT Academy of Engineering') === null, 'Valid institution accepted');
assert(validateInstitution('AB') !== null, 'Rejects institution with < 3 characters');
assert(validateInstitution('') !== null, 'Rejects empty institution');

// 6. Statement of Purpose / Bio Validation Tests
console.log('\n[6] Bio / Statement of Purpose (30 - 300 Chars):');
const validBio = 'I am eager to master full-stack React and cloud architectures.';
const shortBio = 'Too short bio';
assert(validateBio(validBio) === null, 'Valid bio between 30 and 300 characters accepted');
assert(validateBio(shortBio) !== null, 'Rejects bio shorter than 30 characters');
assert(validateBio('') !== null, 'Rejects empty bio');

// 7. Workshop Track Selection (1 to 3) Tests
console.log('\n[7] Workshop Multi-Select (1 to 3) Validation:');
assert(validateWorkshops(['ws1']) === null, 'Accepts 1 workshop');
assert(validateWorkshops(['ws1', 'ws2', 'ws3']) === null, 'Accepts 3 workshops');
assert(validateWorkshops([]) !== null, 'Rejects 0 workshops (minimum 1 required)');
assert(validateWorkshops(['ws1', 'ws2', 'ws3', 'ws4']) !== null, 'Rejects > 3 workshops');

// 8. Password Strength & Rules Tests
console.log('\n[8] Password Strength & Criteria Tests:');
assert(validatePassword('Strong@Pass2026') === null, 'Accepts strong password meeting all 5 criteria');
assert(validatePassword('weak') !== null, 'Rejects short password');
assert(validatePassword('Alllowercase123!') !== null || getPasswordStrength('Alllowercase123!').score >= 4, 'Tests criteria scoring');
const strengthWeak = getPasswordStrength('123');
assert(strengthWeak.score < 2, 'Weak password scored correctly');
const strengthStrong = getPasswordStrength('Complex@Pass2026');
assert(strengthStrong.score === 5, 'Perfect password scores 5/5');

// 9. Confirm Password Match Tests
console.log('\n[9] Confirm Password Match:');
assert(validateConfirmPassword('Match@123', 'Match@123') === null, 'Identical passwords match successfully');
assert(validateConfirmPassword('Mismatch@123', 'Match@123') !== null, 'Rejects mismatched passwords');

// 10. End-to-End Form Step & All Validation Tests
console.log('\n[10] Full Form Validation:');
const validAllRes = validateAll(SAMPLE_VALID_USER);
assert(validAllRes.isValid === true, 'Sample valid user passes all validations without error');
assert(Object.keys(validAllRes.errors).length === 0, 'No errors generated for valid user');

const stepOneRes = validateStep(1, { fullName: '', email: 'bad', phone: '123', dob: '', gender: '' });
assert(stepOneRes.isValid === false, 'Step 1 catches multiple invalid fields');
assert(Object.keys(stepOneRes.errors).length === 5, 'All 5 invalid fields flagged');

console.log('\n====================================================');
console.log(`Test Execution Completed: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}

