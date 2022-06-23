import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Landing,
  Error,
  Register,
  Login,
  PublicRouteLayout,
  Dashboard,
  AddExpense,
  AllExpenses,
  PrivateRouteLayout,
  PrivateRouteProtector,
  Profile,
  Stats,
  LogOut,
  Password,
} from './pages/';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error />}></Route>
        <Route element={<PublicRouteLayout />}>
          <Route path='/landing' element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
        <Route
          element={
            <PrivateRouteProtector>
              <PrivateRouteLayout />
            </PrivateRouteProtector>
          }
        >
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/add-expense' element={<AddExpense />}></Route>
          <Route path='/all-expenses' element={<AllExpenses />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/stats' element={<Stats />}></Route>
          <Route path='/logout' element={<LogOut />}></Route>
          <Route path='/password' element={<Password />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
