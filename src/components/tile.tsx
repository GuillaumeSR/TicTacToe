// import React from 'react';

const Tile = ({ value, onTileClick }: {value: string, onTileClick: React.MouseEventHandler<HTMLButtonElement>}) => {
  
  return (
    <div>
      <button onClick={onTileClick} className="px-4 py-2 font-bold text-white bg-[#284551] border-b-8 border-[#132C36] rounded-2xl h-28 w-28 hover:bg-[#B6CAD3] hover:border-[#7D9AA7]">
        <img src={value} alt="" className="icon"/>
      </button>
    </div>
  );
};

export default Tile;
