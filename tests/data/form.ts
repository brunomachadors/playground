// Test profiles and input variants for the /form page.
// Source of truth: docs/form-page-test-reference.md
//
// Theme: the cast uses the exact field *values* the form expects
// (e.g. country 'usa' not 'United States of America', hobby 'board-games'),
// so each profile can be fed straight into the locators.

export interface FormUser {
  name: string;
  email: string;
  password: string;
  /** Must be one of the select option values, see `countries`. */
  country: string;
  /** Must be one of 'male' | 'female' | 'other', see `genders`. */
  gender: string;
  /** Subset of the checkbox values, see `hobbies`. */
  hobbies: string[];
}

// ---------------------------------------------------------------------------
// Allowed field values (mirror the option/checkbox values in Form.tsx)
// ---------------------------------------------------------------------------

export const countries = ['brazil', 'canada', 'usa', 'mexico', 'portugal'] as const;
export const genders = ['male', 'female', 'other'] as const;
export const hobbies = ['books', 'travelling', 'gaming', 'sports', 'movies', 'board-games'] as const;

// ---------------------------------------------------------------------------
// Valid profiles — happy paths. Together they cover all 5 countries,
// all 3 genders, and 0 / 2 / 6 hobbies.
// ---------------------------------------------------------------------------

// Disciplined leader — minimal-but-complete submission.
export const leonardo: FormUser = {
  name: 'Leonardo Hamato',
  email: 'leo@tmnt.io',
  password: 'Katana#1984',
  country: 'usa',
  gender: 'male',
  hobbies: ['books', 'board-games'],
};

export const raphael: FormUser = {
  name: 'Raphael Hamato',
  email: 'raph@tmnt.io',
  password: 'SaiFury#1984',
  country: 'brazil',
  gender: 'male',
  hobbies: ['sports', 'gaming'],
};

export const donatello: FormUser = {
  name: 'Donatello Hamato',
  email: 'donnie@tmnt.io',
  password: 'BoStaff#1984',
  country: 'portugal',
  gender: 'male',
  hobbies: ['gaming', 'books'],
};

// Covers gender 'other'.
export const michelangelo: FormUser = {
  name: 'Michelangelo Hamato',
  email: 'mikey@tmnt.io',
  password: 'Nunchaku#1984',
  country: 'mexico',
  gender: 'other',
  hobbies: ['movies', 'travelling'],
};

// Covers gender 'female', country 'canada', a name with an apostrophe,
// and the "all 6 hobbies selected" maximum.
export const april: FormUser = {
  name: "April O'Neil",
  email: 'april@channel6.tv',
  password: 'Reporter#1984',
  country: 'canada',
  gender: 'female',
  hobbies: ['books', 'travelling', 'gaming', 'sports', 'movies', 'board-games'],
};

// The sensei — valid submission with NO hobbies selected (hobbies are optional).
export const splinter: FormUser = {
  name: 'Hamato Yoshi',
  email: 'sensei@tmnt.io',
  password: 'Sensei#1984',
  country: 'usa',
  gender: 'male',
  hobbies: [],
};

// Convenience collection of every valid profile.
export const validProfiles: FormUser[] = [
  leonardo,
  raphael,
  donatello,
  michelangelo,
  april,
  splinter,
];

// ---------------------------------------------------------------------------
// Edge / invalid profile — drives the negative scenarios.
// The villain carries every invalid value; negative tests can also start
// from a valid profile and override a single field to isolate one error.
// ---------------------------------------------------------------------------

export const shredder: FormUser = {
  name: ' ', // whitespace only — slips past the presence check (F5)
  email: 'shredder#foot', // malformed — no '@' (N7)
  password: '', // empty (N4)
  country: '', // not selected (N5)
  gender: '', // not selected (N6)
  hobbies: [],
};

// Fully empty input — submitting this should surface all 5 required errors (N1).
export const emptyForm: FormUser = {
  name: '',
  email: '',
  password: '',
  country: '',
  gender: '',
  hobbies: [],
};

// Single-missing-field variants — start from a valid profile and blank ONE
// required field, so exactly one error is expected (N2–N6).
export const missingName: FormUser = { ...leonardo, name: '' };
export const missingEmail: FormUser = { ...leonardo, email: '' };
export const missingPassword: FormUser = { ...leonardo, password: '' };
export const missingCountry: FormUser = { ...leonardo, country: '' };
export const missingGender: FormUser = { ...leonardo, gender: '' };

// Valid profile but with a malformed email — exercises native type="email"
// validation (N7).
export const userWithMalformedEmail: FormUser = { ...leonardo, email: 'shredder#foot' };

// Valid profile but name is whitespace only — slips past the presence check (F5).
export const userWithWhitespaceName: FormUser = { ...leonardo, name: ' ' };

// ---------------------------------------------------------------------------
// Expected validation error messages (id -> text in Form.tsx)
// ---------------------------------------------------------------------------

export const errorMessages = {
  name: 'The name field is required.',
  email: 'The email field is required.',
  password: 'The password field is required.',
  country: 'The country field is required.',
  gender: 'The gender field is required.',
};

// Success page content (/submittedform)
export const successMessages = {
  heading: 'Success!',
  body: 'The form has been submitted successfully.',
};
