// src/Entities/FoundItem.js

const STORAGE_KEY = "found_items";

function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const FoundItem = {
  // List all items (sorted by date if needed)
  list: async (sortKey = "-created_date", limit = null) => {
    let items = getItems();
    if (sortKey === "-created_date") {
      items.sort((a, b) => new Date(b.date_found) - new Date(a.date_found));
    }
    return limit ? items.slice(0, limit) : items;
  },

  // Filter items by condition
  filter: async (conditions, sortKey = null) => {
    let items = getItems();
    items = items.filter((item) => {
      return Object.entries(conditions).every(([key, value]) => item[key] === value);
    });
    if (sortKey === "-created_date") {
      items.sort((a, b) => new Date(b.date_found) - new Date(a.date_found));
    }
    return items;
  },

  // Create new item
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

  // Update existing item
  update: async (id, updates) => {
    let items = getItems();
    items = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveItems(items);
    return items.find((i) => i.id === id);
  },

  // Delete an item
  delete: async (id) => {
    let items = getItems();
    items = items.filter((item) => item.id !== id);
    saveItems(items);
  },
};

export default FoundItem;
