import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FormPage} from './pages/formPage';
import Calculator from './pages/calculator';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
`;
const App = () => {
    return (
    <Container>
        <Router>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </Container>
      
    );
  };

export default App;