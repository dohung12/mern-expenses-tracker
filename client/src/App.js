import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Error, Register, Login } from './pages/';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
