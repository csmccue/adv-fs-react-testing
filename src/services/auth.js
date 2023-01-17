import { client, checkError } from './client.js';

export async function signUpUser(credentials) {
  const response = await client.auth.signUp(credentials);
  return checkError(response);
}

export async function signInUser(credentials) {
  const response = await client.auth.signInWithPassword(credentials);
  return checkError(response);
}

export async function signOutUser() {
  const response = await client.auth.signOut();
  return checkError(response);
}

export async function verifyUser() {
  const response = await client.auth.getSession();
  return checkError(response);
}

const USER_KEY = 'USER';

export function storeLocalUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getLocalUser() {
  const json = localStorage.getItem(USER_KEY);
  try {
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    console.error('Error deserializing user from local store', e);
    storeLocalUser();
  }
}
