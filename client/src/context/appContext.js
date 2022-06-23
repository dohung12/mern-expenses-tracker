import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

// get data from localStorage
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
  user: JSON.parse(user) || null,
  token: token || null,
  showSidebar: false,
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
