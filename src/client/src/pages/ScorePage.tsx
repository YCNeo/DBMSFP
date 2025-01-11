import React, { useState, useEffect } from 'react';

const ScorePage: React.FC = () => {
  const [myScore, setMyScore] = useState<number | null>(null); // 用戶的積分
  const [leaderboard, setLeaderboard] = useState<{ name: string; credit_score: number }[]>([]); // 排行榜數據

  // 獲取個人積分
  const fetchMyScore = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/1'); // 假設用戶 ID = 1
      const data = await response.json();
      if (data.success) {
        setMyScore(data.data.credit_score);
      } else {
        alert('Failed to fetch your score');
      }
    } catch (error) {
      console.error('Error fetching score:', error);
      alert('Error fetching your score');
    }
  };

  // 獲取排行榜
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:5000/leaderboard');
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.data);
      } else {
        alert('Failed to fetch leaderboard');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      alert('Error fetching leaderboard');
    }
  };

  // 初始化數據
  useEffect(() => {
    fetchMyScore();
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Score</h1>
      <p style={{ fontSize: '20px' }}>
        Your current score is: <strong>{myScore !== null ? myScore : 'Loading...'}</strong>
      </p>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={fetchMyScore}
      >
        Refresh Score
      </button>

      <h2>Leaderboard</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{entry.credit_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScorePage;
