const addToLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const removeFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export { addToLocalStorage, removeFromLocalStorage };
