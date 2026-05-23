export type Gender = 'male' | 'female' | 'other';

export type Hobby =
  | 'Read books'
  | 'Travel'
  | 'Video Games'
  | 'Sports'
  | 'Movies'
  | 'Board Games';

export type RegistrationFormData = {
  scenario: string;
  name: string;
  email: string;
  password: string;
  country: string;
  gender: Gender;
  hobbies: Hobby[];
};

export const validRegistrationForms: RegistrationFormData[] = [
  {
    scenario: 'Brazil male with books and sports',
    name: 'Bruno Silva',
    email: 'bruno.silva@example.com',
    password: 'Password123',
    country: 'Brazil',
    gender: 'male',
    hobbies: ['Read books', 'Sports'],
  },
  {
    scenario: 'Portugal female with travel and movies',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    password: 'Password123',
    country: 'Portugal',
    gender: 'female',
    hobbies: ['Travel', 'Movies'],
  },
  {
    scenario: 'Canada other with games',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    password: 'Password123',
    country: 'Canada',
    gender: 'other',
    hobbies: ['Video Games', 'Board Games'],
  },
];

export const requiredFieldMessages = [
  'The name field is required.',
  'The email field is required.',
  'The password field is required.',
  'The country field is required.',
  'The gender field is required.',
];
