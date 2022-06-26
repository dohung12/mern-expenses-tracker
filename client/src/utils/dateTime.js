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

const getMultipleDatesRange = (arg1, arg2) => {
  const date1 = new Date(arg1);
  const y1 = date1.getFullYear();
  const m1 = date1.getMonth();
  const d1 = date1.getDate();

  const date2 = new Date(arg2);
  const y2 = date2.getFullYear();
  const m2 = date2.getMonth();
  const d2 = date2.getDate();

  return {
    from: new Date(y1, m1, d1),
    to: new Date(y2, m2, d2 + 1),
  };
};
export {
  TODAY_RANGE,
  THIS_WEEK,
  THIS_MONTH,
  YESTERDAY,
  getDateRange,
  getMultipleDatesRange,
};
