import React, { useState } from 'react';

// Button layout in visual order: 4 columns
const buttons = [
  { id: 'clear', label: 'AC' },
  { id: 'divide', label: '/' },
  { id: 'multiply', label: '×' },
  { id: 'subtract', label: '−' },
  { id: 'seven', label: '7' },
  { id: 'eight', label: '8' },
  { id: 'nine', label: '9' },
  { id: 'add', label: '+' },
  { id: 'four', label: '4' },
  { id: 'five', label: '5' },
  { id: 'six', label: '6' },
  { id: 'equals', label: '=' },
  { id: 'one', label: '1' },
  { id: 'two', label: '2' },
  { id: 'three', label: '3' },
  { id: 'zero', label: '0' },
  { id: 'decimal', label: '.' },
];

export default function JavaScriptCalculator() {
  const [input, setInput] = useState('0');     // last result or current number
  const [formula, setFormula] = useState('');  // full expression

  const endsWithOp = /[+\-*/]$/;
  const isResult = formula.includes('=');

  // map internal formula to display with proper symbols
  const displayFormula = () => {
    let f = formula;
    f = f.replace(/\*/g, '×');
    f = f.replace(/-/g, '−');
    return f;
  };

  const handleClear = () => {
    setInput('0');
    setFormula('');
  };

  const handleNumber = (val) => {
    if (isResult) {
      setInput(val);
      setFormula(val);
      return;
    }
    // append digit
    if (endsWithOp.test(formula)) {
      setInput(val);
      setFormula((f) => f + val);
    } else {
      // handle leading zero
      if (input === '0') {
        setInput(val);
        setFormula((f) => (f.slice(0, -1) || '') + val);
      } else {
        setInput((i) => i + val);
        setFormula((f) => f + val);
      }
    }
  };

  const handleOperator = (val) => {
    const jsOp = val === '×' ? '*' : val === '−' ? '-' : val;
    if (isResult) {
      setFormula(input + jsOp);
    } else if (endsWithOp.test(formula)) {
      setFormula((f) => f.replace(/[+\-*/]+$/, jsOp));
    } else {
      setFormula((f) => f + jsOp);
    }
  };

  const handleDecimal = () => {
    if (isResult) {
      setInput('0.');
      setFormula('0.');
    } else if (!input.includes('.')) {
      if (endsWithOp.test(formula)) {
        setInput('0.');
        setFormula((f) => f + '0.');
      } else {
        setInput((i) => i + '.');
        setFormula((f) => f + '.');
      }
    }
  };

  const handleEquals = () => {
    let expr = formula;
    if (endsWithOp.test(expr)) expr = expr.slice(0, -1);
    try {
      let result = eval(expr);
      result = Math.round(result * 1e12) / 1e12;
      setInput(result.toString());
      setFormula(expr + '=' + result);
    } catch {
      setInput('Error');
      setFormula('');
    }
  };

  const handleClick = (id, label) => {
    if (id === 'clear') handleClear();
    else if (id === 'equals') handleEquals();
    else if (/^\d$/.test(label)) handleNumber(label);
    else if (label === '.') handleDecimal();
    else handleOperator(label);
  };

  return (
    <div id="calculator" style={{ width: 320, margin: '50px auto', textAlign: 'center' }}>
      <div
        id="display"
        style={{
          background: '#000',
          color: '#0f0',
          padding: '20px',
          fontSize: '1.5rem',
          minHeight: '2rem',
          wordWrap: 'break-word',
          textAlign: 'right'
        }}
      >
        {isResult ? input : displayFormula() || input}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        {buttons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            onClick={() => handleClick(btn.id, btn.label)}
            style={{ padding: '20px', fontSize: '1.2rem' }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
