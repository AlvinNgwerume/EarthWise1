export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
}

export function validateContactForm(input: ContactFormInput): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (!phone) {
    errors.phone = 'Phone number is required.';
  } else if (digitsOnly.length < 7) {
    errors.phone = 'Please enter a valid phone number.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
