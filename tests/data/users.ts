// Test accounts and input variants for the /login page.
// Source of truth: docs/login-page-test-reference.md

export const validUser = { username: 'test', password: 'password123' };
export const blockedUser = { username: 'testblock', password: 'password123' };
export const unknownUser = { username: 'unknown', password: 'password123' };

export const userWithWrongPassword = { username: 'test', password: 'wrong-password' };
// Same password as the valid account but different casing — must fail (case-sensitive).
export const userWithWrongPasswordCase = { username: 'test', password: 'PASSWORD123' };
// Valid credentials typed in uppercase — username is lowercased, so login still succeeds.
export const uppercaseValidUser = { username: 'TEST', password: 'password123' };
// Blocked username with the wrong password — falls through to "User not found!".
export const blockedUserWrongPassword = { username: 'testblock', password: 'wrong-password' };

// Raw username typed vs. the value expected in the field after lowercasing.
export const mixedCaseUsername = { typed: 'TEST', expected: 'test' };

// Expected status messages and post-login dashboard text.
export const messages = {
  loggedIn: 'User successfully logged in! Redirecting...',
  blocked: 'User blocked!',
  notFound: 'User not found!',
  invalidPass: 'Incorrect username or password!',
  temporaryBlock: 'User temporarily blocked!',
  dashboardAuthenticated: 'User test authenticated',
};
