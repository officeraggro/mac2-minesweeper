import {useState} from 'react'
import './App.css';
import Board from './components/Board'

const App = () => {
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(10)
  const [mines, setMines] = useState(10)

  return (
    <>
      <h1>This is my awesome Minesweeper App! Great job!</h1>
      <div className="minesweeper-board">
        <Board height={height} width={width} mines={mines} setMines={setMines}/>
      </div>
    </>
  );
}

export default App

// Parking lot

{/* <p>&#x1F6A9; Flag</p>
<p>&#x1F4A3; Bomb</p> */}
