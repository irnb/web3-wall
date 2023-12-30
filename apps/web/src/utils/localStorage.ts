export const setLocalStorageItemWithExpiry = (
  key: string,
  value: string,
  expiryInMinutes: number
): void => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + expiryInMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageItemWithExpiry = (key: string): string | null => {
  const itemString = localStorage.getItem(key);

  if (!itemString) {
    return null;
  }

  const item = JSON.parse(itemString);

  if (new Date().getTime() > item.expiry) {
    // Item has expired, remove it from localStorage
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};
