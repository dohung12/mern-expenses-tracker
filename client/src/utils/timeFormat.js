import { DateTime } from 'luxon';

function timeFormat(time_ISO_format) {
  // from: 2022-06-11T08:12:32.810Z
  // to: Jun 11, 2022, 3:12 PM
  return DateTime.fromISO(time_ISO_format).toLocaleString(
    DateTime.DATETIME_MED
  );
}

export default timeFormat;
