// import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="overflow-hidden bg-[#36CDCA] rounded-2xl shadow-lg px-4 my-4">
        <h1 className="text-4xl font-bold text-[#203741] px-4 py-4">Welcome to my TicTacToe game !</h1>
      </div>
      <Link to="/game">
        <button className="px-6 py-3 text-[#203741] transition bg-[#F6BC47] rounded-lg shadow-md hover:bg-[#36CDCA]">
          Play Game
        </button>
      </Link>
    </div>
  );
};

export default Home;
