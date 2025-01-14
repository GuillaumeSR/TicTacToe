// import React from 'react';

const Tile = ({ value, onTileClick }: {value: string, onTileClick: React.MouseEventHandler<HTMLButtonElement>}) => {
  
  return (
    <div>
      <button onClick={onTileClick} className="px-4 py-2 font-bold text-white bg-gray-700 border-b-4 border-gray-900 rounded-lg h-28 w-28 hover:bg-gray-600 hover:border-gray-700">
        <img src={value} alt="" className="icon"/>
      </button>
    </div>
  );
};

export default Tile;
