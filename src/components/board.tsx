// import React from 'react';
import Tile from "./tile";
import cross from "../assets/cross.svg";
import crossStatus from "../assets/cross.webp"
import circle from "../assets/circle.svg";
import circleStatus from "../assets/circle.webp"
import { useState } from "react";

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [tiles, setTiles] = useState(Array(9).fill(null));

  function handleClick(i: number) {
    if (tiles[i] || calculateWinner(tiles)) {
      return;
    }
    const nextTiles = tiles.slice();
    if (xIsNext) {
      nextTiles[i] = cross;
    } else {
      nextTiles[i] = circle;
    }
    setTiles(nextTiles);
    setXIsNext(!xIsNext);
  };

  const draw = calculateDraw(tiles);
  const winner = calculateWinner(tiles);
  let drawCount: number = 0;
  let XWinCount: number = 0;
  let OWinCount: number = 0;
  let status;
  let statusValue;

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
          <Tile value={tiles[0]} onTileClick={() => handleClick(0)}/>
          <Tile value={tiles[1]} onTileClick={() => handleClick(1)}/>
          <Tile value={tiles[2]} onTileClick={() => handleClick(2)}/>
          <Tile value={tiles[3]} onTileClick={() => handleClick(3)}/>
          <Tile value={tiles[4]} onTileClick={() => handleClick(4)}/>
          <Tile value={tiles[5]} onTileClick={() => handleClick(5)}/>
          <Tile value={tiles[6]} onTileClick={() => handleClick(6)}/>
          <Tile value={tiles[7]} onTileClick={() => handleClick(7)}/>
          <Tile value={tiles[8]} onTileClick={() => handleClick(8)}/>
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
