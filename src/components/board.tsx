// import React from 'react';
import Tile from "./tile";
import cross from "../assets/cross.svg";
import crossStatus from "../assets/cross.webp"
import circle from "../assets/circle.svg";
import circleStatus from "../assets/circle.webp"
import React, { useState, useEffect, useCallback } from "react";

interface BoardProps {
  isCpuMode: boolean;
}

const Board: React.FC<BoardProps> = ({ isCpuMode }) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [, setIsCpuTurn] = useState(false);
  const [winCounts, setWinCounts] = useState({ player1: 0, cpu: 0, draw: 0 })
  
  const draw = calculateDraw(tiles);
  const winner = calculateWinner(tiles);

  const handleCpuMove = useCallback(() => {
    const emptyTiles = tiles
      .map((tile, index) => (tile === null ? index : null))
      .filter((index) => index !== null);
    
    if (emptyTiles.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const tileIndex = emptyTiles[randomIndex as number];
    const nextTiles = [...tiles];
    nextTiles[tileIndex as number] = circle;
    setTiles(nextTiles);
    setXIsNext(true);
  }, [tiles]);

  useEffect(() => {
    if (isCpuMode && !xIsNext && !winner && !draw) {
      setIsCpuTurn(true);
      const timer = setTimeout(() => {
        handleCpuMove();
        setIsCpuTurn(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, tiles, winner, draw, isCpuMode, handleCpuMove]);
  
  const handleClick = (i: number) => {
    if (tiles[i] || calculateWinner(tiles) || (isCpuMode && !xIsNext)) return;
    
    const nextTiles = [...tiles];
    nextTiles[i] = xIsNext ? cross : circle;
    setTiles(nextTiles);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setTiles(Array(9).fill(null));
    setXIsNext(true);
  }

  useEffect(() => {
    if (winner || draw) {
      setWinCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
        if (winner === cross) {
          newCounts.player1 += 1;
        } else if (winner === circle) {
          newCounts.cpu += 1;
        } else if (draw) {
          newCounts.draw += 1;
        }
        return newCounts;
      });
    }
  }, [winner, draw]);

  let status: string;
  let statusValue: string;

  if (winner) {
    status = "Winner";
    statusValue = winner === cross ? crossStatus : circleStatus;
  } else if (draw) {
    status = "Draw";
    statusValue = "";
  } else {
    status = "Turn";
    statusValue = xIsNext ? crossStatus : circleStatus;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex justify-center uppercase status px-4 py-2 text-sm text-center text-[#B6CAD3] bg-[#284551] mx-auto border-b-8 rounded-2xl border-[#132C36]">
            {statusValue && <img src={statusValue} className="w-8 h-8 icon"/>}
            <div className="px-5 py-1">
              <span className="inline-block align-middle">{status}</span>
            </div>
          </div>
          <div className="flex justify-center px-4 mx-auto">
            <button onClick={resetBoard} className="px-4 py-2 bg-[#36CDCA] text-[#203741] rounded-lg hover:bg-[#28B0B0] transition">Reset Board</button>
          </div>
        </div>
        
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-8">
          {tiles.map((tile, index) => (
            <Tile key={index} value={tile} onTileClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-8">
          <div className="overflow-hidden bg-[#36CDCA] rounded-2xl shadow-lg px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">Player 1 (X)</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{winCounts.player1}</span>
            </div>
          </div>
          <div className="overflow-hidden bg-[#B6CAD3] rounded-2xl shadow-lg px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">Draws</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{winCounts.draw}</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg bg-[#F6BC47] px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">{isCpuMode ? "CPU" : "Player 2 (O)"}</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{winCounts.cpu}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function calculateDraw(tiles: number[]) {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === null) {
      return null;
    };
  };
  return true;
}

function calculateWinner(tiles: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
}

export default Board;
