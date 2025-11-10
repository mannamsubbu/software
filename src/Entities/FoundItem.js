// src/Entities/FoundItem.js

const STORAGE_KEY = "found_items";

/**
 * Since there's no real database, we clear the simulated storage
 * on every page load so the app always starts fresh at zero.
 */
localStorage.removeItem(STORAGE_KEY);

function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const FoundItem = {
  /**
   * List all items (optionally sorted and limited)
   */
  list: async (sortKey = "-created_date", limit = null) => {
    let items = getItems();
    if (sortKey === "-created_date") {
      items.sort((a, b) => new Date(b.date_found) - new Date(a.date_found));
    }
    return limit ? items.slice(0, limit) : items;
  },

  /**
   * Filter items by exact-match conditions
   */
  filter: async (conditions, sortKey = null) => {
    let items = getItems();
    items = items.filter((item) =>
      Object.entries(conditions).every(([key, value]) => item[key] === value)
    );
    if (sortKey === "-created_date") {
      items.sort((a, b) => new Date(b.date_found) - new Date(a.date_found));
    }
    return items;
  },

  /**
   * Create a new item (defaults to available)
   */
  create: async (item) => {
    let items = getItems();
    const newItem = {
      id: Date.now().toString(),
      status: "available",
      ...item,
    };
    items.push(newItem);
    saveItems(items);
    return newItem;
  },

  /**
   * Update an item by id
   */
  update: async (id, updates) => {
    let items = getItems();
    items = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveItems(items);
    return items.find((i) => i.id === id);
  },

  /**
   * Delete an item by id
   */
  delete: async (id) => {
    let items = getItems();
    items = items.filter((item) => item.id !== id);
    saveItems(items);
  },

  /**
   * Optional helper to manually clear all items at any time.
   */
  reset: async () => {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  },
};

export default FoundItem;
