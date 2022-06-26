const today = new Date();

const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
const dayOfWeek = today.getDay();

const thisWeek = {
  from: new Date(y, m, d - dayOfWeek),
  end: new Date(y, m, d + 7 - dayOfWeek),
};

const thisMonth = {
  from: new Date(y, m, 1),
  to: new Date(y, m + 1, 1),
};

export { today, thisWeek, thisMonth };
