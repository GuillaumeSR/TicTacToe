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

  const winner = calculateWinner(tiles);
  let status;
  let statusValue;
  if (winner) {
    status = "Winner";
    statusValue = (xIsNext ? circleStatus : crossStatus);
  } else {
    status = "Turn";
    statusValue = (xIsNext ? crossStatus : circleStatus);
  }

  return (
    <>
      <div className="flex justify-center uppercase status text-neutral-400 "><img src={statusValue} alt="" className="w-8 h-8 icon"/><div><span className="inline-block align-middle">{status}</span></div></div>
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
    </>
  );
};

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
