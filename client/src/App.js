import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Error, Register, Login, PublicRouteLayout } from './pages/';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouteLayout />}>
          <Route path='/landing' element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
