const TODAY = new Date();

const y = TODAY.getFullYear();
const m = TODAY.getMonth();
const d = TODAY.getDate();
const dayOfWeek = TODAY.getDay();

const TODAY_RANGE = {
  from: new Date(y, m, d),
  to: new Date(y, m, d + 1),
};

const YESTERDAY = {
  from: new Date(y, m, d - 1),
  to: new Date(y, m, d),
};

const THIS_WEEK = {
  from: new Date(y, m, d - dayOfWeek),
  to: new Date(y, m, d + 7 - dayOfWeek),
};

const THIS_MONTH = {
  from: new Date(y, m, 1),
  to: new Date(y, m + 1, 1),
};

const getDateRange = (arg) => {
  const date = new Date(arg);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return {
    from: new Date(y, m, d),
    to: new Date(y, m, d + 1),
  };
};
export { TODAY_RANGE, THIS_WEEK, THIS_MONTH, YESTERDAY, getDateRange };
