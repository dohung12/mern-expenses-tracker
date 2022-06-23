import { useState } from 'react';

const initAlertState = {
  showAlert: false,
  alertText: '',
  alertType: '',
};

const useAlert = () => {
  const [alert, setAlert] = useState(initAlertState);

  /**
   * ALERT CONTROLLER
   */
  const displayAlert = (alertText, alertType) => {
    setAlert({
      showAlert: true,
      alertText,
      alertType,
    });

    // clear alert after 3s
    setTimeout(() => clearAlert(), 3000);
  };

  const clearAlert = () => {
    setAlert(initAlertState);
  };

  return [alert, displayAlert];
};

export default useAlert;
