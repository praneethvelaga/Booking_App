import './App.css';
import HomeComponent from './components/HomeComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage';
import Registration from './components/Registration'
import EmployeeLogin from './components/EmployeeLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Registration />}/>
        <Route path='/login' element={<Loginpage />}/>
        <Route path='/home' element={<HomeComponent />} />
        <Route exact path='/employee-login' element={<EmployeeLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
