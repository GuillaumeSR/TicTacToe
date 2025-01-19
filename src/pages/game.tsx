// import React from 'react';
import { useState } from "react";
import Board from "../components/board"

const Game = () => {
  const [isCpuMode, setIsCpuMode] = useState(false);

  const handleModeChange = (mode: boolean) => {
    setIsCpuMode(mode);
  }
  
  return (
    <>
      <div className="flex justify-center my-4">
        <button
          className="mx-2 btn btn-primary"
          onClick={() => handleModeChange(false)}
        >
          Play Against Player
        </button>
        <button
          className="mx-2 btn btn-primary"
          onClick={() => handleModeChange(true)}
        >
          Play Against Cpu
        </button>
      </div>
      <Board isCpuMode={isCpuMode}/>
    </>
  );
};

export default Game;
