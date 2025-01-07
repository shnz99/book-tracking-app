import React, { useState } from 'react';
import './styles/ReadingGoals.css';

const ReadingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [progress, setProgress] = useState({});

  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const handleProgressChange = (goal, event) => {
    setProgress({
      ...progress,
      [goal]: event.target.value,
    });
  };

  return (
    <div className="reading-goals">
      <h1>Reading Goals</h1>
      <div className="add-goal">
        <input
          type="text"
          value={newGoal}
          onChange={handleNewGoalChange}
          placeholder="Enter a new goal"
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            <span>{goal}</span>
            <input
              type="number"
              value={progress[goal] || 0}
              onChange={(event) => handleProgressChange(goal, event)}
              min="0"
              max="100"
            />
            <span>%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingGoals;
