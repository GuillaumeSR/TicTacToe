import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home.tsx'
import Game from './pages/game.tsx'
import Leaderboard from './pages/leaderboard.tsx'
import PlayerCpu from './pages/player-cpu.tsx'
import AskPseudo from './pages/ask-pseudo.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/game",
        element: <Game/>
      },
      {
        path: "/leaderboard",
        element: <Leaderboard/>
      },
      {
        path: "/player-cpu",
        element: <PlayerCpu/>
      },
      {
        path: "/ask-pseudo",
        element: <AskPseudo/>
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
