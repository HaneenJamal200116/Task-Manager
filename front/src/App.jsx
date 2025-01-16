import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import './index.css';
import Add from './tasks/Add';
const App = () => {
  return (
    <div >

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<Signin />} />
        <Route path="/tasks" element={<Add />} />
      </Routes>
    </Router>
    

    </div>
  );
};

export default App;
