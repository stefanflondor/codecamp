// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RandomQuoteMachine from './pages/RandomQuoteMachine';
import MarkdownPreviewer from './pages/MarkdownPreviewer';
import DrumMachine from './pages/DrumMachine';
import JavaScriptCalculator from './pages/JavaScriptCalculator';
import TwentyFivePlusFiveClock from './pages/TwentyFivePlusFiveClock';

function App() {
  return (
    <Router>
      <h1>Stefan Flondor freecodecamp Front End Development Libraries</h1>
      <nav>
        <ul>
          <li><Link to="/random-quote-machine">Random Quote Machine</Link></li>
          <li><Link to="/markdown-previewer">Markdown Previewer</Link></li>
          <li><Link to="/drum-machine">Drum Machine</Link></li>
          <li><Link to="/javascript-calculator">JavaScript Calculator</Link></li>
          <li><Link to="/twenty-five-plus-five-clock">25 + 5 Clock</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/random-quote-machine" element={<RandomQuoteMachine />} />
        <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
        <Route path="/drum-machine" element={<DrumMachine />} />
        <Route path="/javascript-calculator" element={<JavaScriptCalculator />} />
        <Route path="/twenty-five-plus-five-clock" element={<TwentyFivePlusFiveClock />} />
      </Routes>
    </Router>
  );
}

export default App;
