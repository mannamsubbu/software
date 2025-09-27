// src/Entities/User.js
const STORAGE_KEY = "current_user";

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

const User = {
  // Login as normal user (dev mock)
  login: () => {
    const user = { email: "test@example.com", full_name: "Test User", role: "user" };
    saveUser(user);
    window.location.reload();
  },

  // Simulate redirect login
  loginWithRedirect: () => {
    User.login();
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  },

  // Return current user (throws if not logged in)
  me: async () => {
    const user = getCurrentUser();
    if (!user) throw new Error("Not logged in");
    return user;
  },

  // Helper to quickly log in as admin for testing
  loginAsAdmin: () => {
    const user = { email: "admin@example.com", full_name: "Admin User", role: "admin" };
    saveUser(user);
    window.location.reload();
  }
};

// Export both named and default to be compatible with either import style.
export { User };
export default User;
