import { UserRole } from '../types/database';

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'Singapore',
  'Other',
];

export const ROLES: { value: UserRole; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'job_seeker', label: 'Job Seeker' },
  { value: 'teacher', label: 'Teacher / Educator' },
  { value: 'employer', label: 'Employer / Recruiter' },
];

export function validateFullName(fullName: string): { valid: boolean; error?: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { valid: false, error: 'Full name is required.' };
  }
  if (/^\d+$/.test(trimmed)) {
    return { valid: false, error: 'Full name cannot contain only numbers.' };
  }
  if (/^[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'-]+$/.test(trimmed)) {
    return { valid: false, error: 'Full name contains invalid symbols.' };
  }
  if (trimmed.replace(/[\s'-]/g, '').length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters long.' };
  }
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Email address is required.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

export function validateMobile(
  mobile: string | undefined,
  country: string
): { valid: boolean; error?: string } {
  if (!mobile || mobile.trim() === '') {
    return { valid: true }; // Optional field unless required
  }

  const cleaned = mobile.trim();

  if (/[a-zA-Z]/.test(cleaned)) {
    return { valid: false, error: 'Mobile number cannot contain letters.' };
  }

  const digitsOnly = cleaned.replace(/\D/g, '');

  if (country === 'India') {
    if (digitsOnly.length !== 10) {
      return { valid: false, error: 'Indian mobile number must be exactly 10 digits.' };
    }
    if (!/^[6-9]/.test(digitsOnly)) {
      return { valid: false, error: 'Indian mobile number must start with 6, 7, 8, or 9.' };
    }
    if (/^(\d)\1{9}$/.test(digitsOnly)) {
      return { valid: false, error: 'Mobile number cannot be all repeated digits.' };
    }
    if (digitsOnly === '1234567890' || digitsOnly === '9876543210') {
      return { valid: false, error: 'Please enter a genuine mobile number.' };
    }
  } else {
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return { valid: false, error: 'Mobile number must be between 7 and 15 digits.' };
    }
  }

  return { valid: true };
}

export function validatePassword(password: string): {
  valid: boolean;
  score: number;
  errors: string[];
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length < 8) {
    errors.push('Must be at least 8 characters long');
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain at least one uppercase letter');
  } else {
    score += 1;
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Must contain at least one lowercase letter');
  } else {
    score += 1;
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Must contain at least one number');
  } else {
    score += 1;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Must contain at least one special character (!@#$%^&*)');
  } else {
    score += 1;
  }

  return {
    valid: errors.length === 0,
    score,
    errors,
  };
}
