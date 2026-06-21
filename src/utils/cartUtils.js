export const getCartKey = (userId) => {
  if (!userId) return null;
  return `bookingCart_${userId}`;
};

export const getCartItem = () => {
  const userId = localStorage.getItem("userId");
  const key = getCartKey(userId);
  if (!key) return null;

  const savedCart = localStorage.getItem(key);
  if (savedCart) {
    return JSON.parse(savedCart);
  }

  const legacyCart = localStorage.getItem("bookingCart");
  if (legacyCart) {
    localStorage.setItem(key, legacyCart);
    localStorage.removeItem("bookingCart");
    return JSON.parse(legacyCart);
  }

  return null;
};

export const setCartItem = (cartData) => {
  const userId = localStorage.getItem("userId");
  const key = getCartKey(userId);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cartData));
};

export const removeCartItem = () => {
  const userId = localStorage.getItem("userId");
  const key = getCartKey(userId);
  if (!key) return;
  localStorage.removeItem(key);
};

export const hasCart = () => !!getCartItem();
