// import React from 'react';
import Tile from "./tile";
import cross from "../assets/cross.svg";
import crossStatus from "../assets/cross.webp"
import circle from "../assets/circle.svg";
import circleStatus from "../assets/circle.webp"
import React, { useState, useEffect } from "react";

interface BoardProps {
  isCpuMode: boolean;
}

const Board: React.FC<BoardProps> = ({ isCpuMode }) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [isCpuTurn, setIsCpuTurn] = useState(false);
  
  const draw = calculateDraw(tiles);
  const winner = calculateWinner(tiles);
  let status: string;
  let statusValue: string;

  useEffect(() => {
    if (isCpuMode && !xIsNext && !winner && !draw) {
      setIsCpuTurn(true);
      const timer = setTimeout(() => {
        handleCpuMove();
        setIsCpuTurn(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, tiles, winner, draw, isCpuMode]);
  
  const handleClick = (i: number) => {
    if (tiles[i] || calculateWinner(tiles) || (isCpuMode && !xIsNext)) return;
    
    const nextTiles = tiles.slice();
    nextTiles[i] = xIsNext ? cross : circle;
    setTiles(nextTiles);
    setXIsNext(!xIsNext);
  };

  const handleCpuMove = () => {
    const emptyTiles = tiles
      .map((tile, index) => (tile === null ? index : null))
      .filter((index) => index !== null);
    
    if (emptyTiles.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const tileIndex = emptyTiles[randomIndex as number];
    const nextTiles = tiles.slice();
    nextTiles[tileIndex as number] = circle;
    setTiles(nextTiles);
    setXIsNext(true);
  }

  let drawCount: number = 0;
  let XWinCount: number = 0;
  let OWinCount: number = 0;

  if (winner || draw) {
    if (draw) {
      drawCount += 1;
      status = "Draw"
      statusValue = "";
    } else {
      if (xIsNext) {
        OWinCount += 1;
      } else {
        XWinCount += 1;
      }
      status = "Winner";
      statusValue = (xIsNext ? circleStatus : crossStatus);
    }
  } else {
    status = "Turn";
    statusValue = (xIsNext ? crossStatus : circleStatus);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center uppercase status px-4 py-2 text-sm text-center text-[#B6CAD3] bg-[#284551] mx-auto border-b-8 rounded-2xl border-[#132C36]">
          <img src={statusValue} className="w-8 h-8 icon"/>
          <div className="px-5 py-1">
            <span className="inline-block align-middle">{status}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-8">
          {tiles.map((tile, index) => (
            <Tile
              key={index}
              value={tile}
              onTileClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-8 gap-y-8">
          <div className="overflow-hidden bg-[#36CDCA] rounded-2xl shadow-lg px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">X (joueur 1)</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{XWinCount}</span>
            </div>
          </div>
          <div className="overflow-hidden bg-[#B6CAD3] rounded-2xl shadow-lg px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">Égalité</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{drawCount}</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg bg-[#F6BC47] px-4">
            <div className="px-2 py-2">
              <div className="text-xl font-bold">O (joueur 2)</div>
            </div>
            <div className="px-2">
              <span className="inline-block px-3 py-1 mb-2 mx-2 text-sm font-semibold text-[#203741]">{OWinCount}</span>
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

function calculateWinner(tiles: number[]) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
}

export default Board;
