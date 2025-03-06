import logo from './logo.svg';
import './App.css';
import HomeComponent from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileComponent from './component/profile';
import Loginpage from './component/loginpage';
import Registration from './component/registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path='/registerlink' element={<Registration />}/>
        <Route path='/login' element={<Loginpage />}/>
        <Route path='/homeLink' element={<HomeComponent />} />
        <Route path='/home' element={<HomeComponent />} />
        <Route path="/profile" element={<ProfileComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
