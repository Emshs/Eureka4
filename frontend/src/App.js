import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

const App = () => {
    return (
        <Router>
            <Routes> {/* Switch 대신 Routes 사용 */}
                <Route path="/" element={<MainPage />} /> {/* component 대신 element 사용 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
