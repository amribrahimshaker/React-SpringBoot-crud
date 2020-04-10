export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  //   console.log("user", user);
  return JSON.parse(user);
}

export function login(profileObj) {
  //   console.log("profileObj", profileObj);

  localStorage.setItem("currentUser", JSON.stringify(profileObj));
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export default {
  getCurrentUser,
  login,
  logout,
};
