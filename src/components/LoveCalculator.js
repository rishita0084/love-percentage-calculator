import React, { useState } from "react";
import "./Gingham.css";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [lovePercent, setLovePercent] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [loveMessage, setLoveMessage] = useState("");

  const handleCalculate = () => {
    if (name1.trim() === "" || name2.trim() === "") return;
    setCalculating(true);
    setLovePercent(null);

    setTimeout(() => {
      const result = calculateLovePercent(name1, name2);
      setLovePercent(result);
      setLoveMessage(getLoveMessage(result));
      setCalculating(false);
    }, 2000);
  };

  const getLoveMessage = (percent) => {
    if (percent >= 80) return "True love! You're meant to be together! ❤️";
    if (percent >= 60) return "Strong connection! This could be something special.";
    if (percent >= 40) return "There's potential. Give it time to grow!";
    if (percent >= 20) return "Friends for now, but who knows what the future holds.";
    return "Maybe look elsewhere... but never say never!";
  };

  const calculateLovePercent = (name1, name2) => {
    const yourName = name1.toLowerCase().split("");
    const theirName = name2.toLowerCase().split("");
    const loves = ["l", "o", "v", "e", "s"];
    const arr = [...yourName, ...theirName, ...loves];

    const counts = [];
    const str = arr.join("");
    const visited = new Set();

    for (const c of arr) {
      if (!visited.has(c)) {
        visited.add(c);
        counts.push(countOccurrences(str, c));
      }
    }

    return reduceToTwoDigits(counts);
  };

  const countOccurrences = (str, ch) => {
    let count = 0;
    for (const c of str) {
      if (c === ch) {
        count++;
      }
    }
    return count;
  };

  const reduceToTwoDigits = (list) => {
    while (list.length > 2) {
      const newList = [];
      const n = list.length;
      for (let i = 0; i < Math.ceil(n / 2); i++) {
        let sum = list[i];
        if (i !== n - 1 - i) {
          sum += list[n - 1 - i];
        }
        if (sum >= 10) {
          newList.push(Math.floor(sum / 10));
          newList.push(sum % 10);
        } else {
          newList.push(sum);
        }
      }
      list = newList;
    }
    
    // If we end up with only one number, pad with a zero
    if (list.length === 1) {
      return list[0];
    }
    
    return list[0] * 10 + list[1];
  };

  return (
    <div className="love-calculator">
      <h1 className="title">Love Calculator</h1>
      
      <div className="card">
        <div className="heart-decoration heart-1">❤️</div>
        <div className="heart-decoration heart-2">💕</div>
        
        <div className="input-box">
          <input
            type="text"
            placeholder="Your Name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Crush's Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
        
        <button className="calculate-btn" onClick={handleCalculate}>
          Calculate
        </button>

        {calculating && <div className="loading">💓 Calculating... 💓</div>}

        {lovePercent !== null && (
          <div className="love-result">
            <div className="love-result-inner">
              Your Love Score:
              <div className="love-percentage">
                {lovePercent}%
                <div className="percentage-decoration"></div>
              </div>
              <div className="love-message">{loveMessage}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveCalculator;