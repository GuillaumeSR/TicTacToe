// import React from 'react';
import cross from "../assets/cross.svg"

const Game = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-x-8 gap-y-8">
        <div>
          <button className="px-4 py-2 font-bold text-white bg-gray-700 border-b-4 border-gray-900 rounded-lg h-28 w-28 hover:bg-gray-600 hover:border-gray-700">
            <img src={cross} alt="cross-icon" className="icon"/>
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Game;
