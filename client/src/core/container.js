export function checkLoggedIn() {
  const cookie = document.cookie;
  return cookie.includes("uid");
  // return true
}

export function checkRegistered() {
  const cookie = document.cookie;
  return cookie.includes("registered");
  // return true
}
export let user = {
  firstName: "",
  lastName: "",
  email: "",
};

export function getUserData() {
  return user;
}

export const devUrl = "http:localhost:5000";
