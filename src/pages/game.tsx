// import React from 'react';
import { useState } from "react";
import Board from "../components/board"

const Game = () => {
  const [isCpuMode, setIsCpuMode] = useState(false);
  
  return (
    <>
      <div className="flex justify-center mb-1 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              !isCpuMode ? "bg-[#36CDCA]" : "bg-[#B6CAD3]"
            }`}
            onClick={() => setIsCpuMode(false)}
          >
            Play Against Player
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isCpuMode ? "bg-[#36CDCA]" : "bg-[#B6CAD3]"
            }`}
            onClick={() => setIsCpuMode(true)}
          >
            Play Against CPU
          </button>
        </div>
        <Board isCpuMode={isCpuMode} />
    </>
  );
};

export default Game;
