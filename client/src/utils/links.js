import { MdDashboard } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { FaMoneyCheck, FaPlusSquare, FaChartArea } from 'react-icons/fa';
const links = [
  {
    id: 1,
    text: 'Dashboard',
    path: '/',
    icon: <MdDashboard />,
  },
  {
    id: 2,
    text: 'All Expenses',
    path: 'all-expenses',
    icon: <FaMoneyCheck />,
  },
  {
    id: 3,
    text: 'Add Expense',
    path: 'add-expense',
    icon: <FaPlusSquare />,
  },

  {
    id: 4,
    text: 'Profile',
    path: 'profile',
    icon: <ImProfile />,
  },

  {
    id: 5,
    text: 'Stats',
    path: 'stats',
    icon: <FaChartArea />,
  },
];

export default links;
