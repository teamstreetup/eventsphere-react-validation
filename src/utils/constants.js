export const PASS_TIERS = [
  {
    id: 'student',
    name: 'Student Pass',
    price: 499,
    badge: 'Popular for Undergrads',
    features: ['Access to all keynote talks', 'Access to open exhibition hall', 'Digital certificate & swag kit', 'Valid student ID required at check-in'],
    color: '#3b82f6'
  },
  {
    id: 'developer',
    name: 'Professional Developer Pass',
    price: 1499,
    badge: 'Most Popular',
    features: ['All Keynotes & Technical Tracks', 'Hands-on Workshop Access', 'Lunch & Networking Mixer', 'Conference T-shirt & Swag Kit', 'Priority Q&A Sessions'],
    color: '#8b5cf6'
  },
  {
    id: 'vip',
    name: 'VIP All-Access Pass',
    price: 2999,
    badge: 'Full Access',
    features: ['All Keynotes, Tracks & All Workshops', 'Exclusive Speakers Dinner & Lounge', '1-on-1 Mentorship session', 'Premium VIP Swag Box', 'Fast-track registration desk'],
    color: '#ec4899'
  }
];

export const WORKSHOPS = [
  {
    id: 'ws1',
    title: 'Building Enterprise React 19 Applications',
    instructor: 'Alex Rivera (Staff Engineer)',
    duration: '3.5 Hours',
    capacity: '50 Seats Left',
    category: 'Frontend',
    extraFee: 200
  },
  {
    id: 'ws2',
    title: 'Modern Full-Stack API Architecture with Node & TypeScript',
    instructor: 'Dr. Sarah Chen (Cloud Architect)',
    duration: '4 Hours',
    capacity: '32 Seats Left',
    category: 'Backend',
    extraFee: 250
  },
  {
    id: 'ws3',
    title: 'Deploying Generative AI Agents with Python & LLMs',
    instructor: 'Marcus Vance (AI Researcher)',
    duration: '3 Hours',
    capacity: '18 Seats Left',
    category: 'AI & ML',
    extraFee: 300
  },
  {
    id: 'ws4',
    title: 'DevOps Mastery: CI/CD, Docker & Kubernetes Deployments',
    instructor: 'Priya Sharma (DevOps Lead)',
    duration: '4 Hours',
    capacity: '40 Seats Left',
    category: 'Cloud',
    extraFee: 200
  },
  {
    id: 'ws5',
    title: 'Web Application Security & Ethical Hacking Defense',
    instructor: 'Vikram Joshi (CyberSec Principal)',
    duration: '3.5 Hours',
    capacity: '25 Seats Left',
    category: 'Security',
    extraFee: 250
  }
];

export const TECH_TRACKS = [
  'Full-Stack Web & Mobile Development',
  'Artificial Intelligence & Machine Learning',
  'Cloud Native Architecture & DevOps',
  'Cybersecurity & Application Hardening',
  'Data Science & Big Data Engineering'
];

export const PROMO_CODES = {
  STUDENT50: {
    type: 'percent',
    value: 50,
    description: '50% Student Discount Applied!'
  },
  EARLYBIRD: {
    type: 'percent',
    value: 25,
    description: '25% Early Bird Discount Applied!'
  },
  DEVCON: {
    type: 'flat',
    value: 300,
    description: 'Flat ₹300 Special Discount Applied!'
  }
};

export const INITIAL_FORM_DATA = {
  // Step 1: Personal Details
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',

  // Step 2: Academic & Professional Profile
  institution: '',
  designation: 'Student',
  techTrack: TECH_TRACKS[0],
  portfolioUrl: '',
  bio: '',

  // Step 3: Pass & Workshops
  passTier: 'developer',
  selectedWorkshops: ['ws1'],
  tshirtSize: 'M',
  dietaryPreference: 'Vegetarian',
  promoCode: '',

  // Step 4: Security & Acknowledgement
  password: '',
  confirmPassword: '',
  agreeTerms: false,
  agreeNewsletter: true
};

export const SAMPLE_VALID_USER = {
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma2026@gmail.com',
  phone: '9876543210',
  dob: '2003-08-15',
  gender: 'Male',
  institution: 'Maharashtra Institute of Technology',
  designation: 'Student',
  techTrack: 'Full-Stack Web & Mobile Development',
  portfolioUrl: 'https://github.com/aaravsharma',
  bio: 'Passionate computer engineering student eager to master React 19, scalable web architectures, and interactive frontends.',
  passTier: 'developer',
  selectedWorkshops: ['ws1', 'ws3'],
  tshirtSize: 'L',
  dietaryPreference: 'Vegetarian',
  promoCode: 'STUDENT50',
  password: 'SecurePass@2026',
  confirmPassword: 'SecurePass@2026',
  agreeTerms: true,
  agreeNewsletter: true
};
