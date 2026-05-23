export type Character = {
  id: string;
  name: string;
  house: string;
  dateOfBirth: string;
  actor: string;
  image: string;
};

export const charactersApiUrl = 'https://hp-api.onrender.com/api/characters';

export const characterScenarios = [
  { index: 0, name: 'Harry Potter' },
  { index: 1, name: 'Hermione Granger' },
  { index: 2, name: 'Ron Weasley' },
  { index: 3, name: 'Draco Malfoy' },
  { index: 4, name: 'Minerva McGonagall' },
  { index: 5, name: 'Cedric Diggory' },
  { index: 6, name: 'Cho Chang' },
  { index: 7, name: 'Severus Snape' },
  { index: 8, name: 'Rubeus Hagrid' },
  { index: 9, name: 'Neville Longbottom' },
];

export function normalizeCharacterName(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '');
}
