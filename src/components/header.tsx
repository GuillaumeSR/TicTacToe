// import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <img src="logo.png" alt="TicTacToe Logo" className="logo" />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/game">Game</a></li>
          <li><a href="/leaderboard">Leaderboard</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
