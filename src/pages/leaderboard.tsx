import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<{ name: string; streak: number }[]>([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboard(storedLeaderboard);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-3xl font-bold">Leaderboard</h1>
      <div className="w-full max-w-lg p-4 bg-[#F5F5F5] rounded-xl shadow-md">
        <ul>
        {leaderboard.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between px-4 py-2 border-b last:border-b-0"
          >
            <span>{entry.name}</span>
            <span>{entry.streak}</span>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;