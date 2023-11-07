import { useState } from "react"

const Cell = ({ cellData, minesLeft }) => {
  const [flag, setFlag] = useState(false);
  const [reveal, setReveal] = useState(false)

  const handleCellClick = (cell, x, y) => {
    
    // Check if cell is revealed. Return if true.
    if (cell.isRevealed || cell.isFlagged) {
      return null;
    }

    // Check if mine. Game over if true {
    if (cell.isMine) {
      cell.isRevealed = true
      setReveal(true)
      window.alert("Game over");

    }

    if (!cell.isRevealed) {
      cell.isRevealed = true
      setReveal(true)
    }
  };


  const handleContextMenu = (e, cell, x, y) => {
    e.preventDefault()

    if (!cell.isFlagged) {
      cell.isFlagged = true;
      setFlag(true);
      if (cell.isMine) {
        minesLeft.current = minesLeft.current - 1
      }
      if (minesLeft.current === 0) {
        window.alert("You won!")
        window.location.reload(false)
      }
    } else {
      setFlag(false);
    }
  };

  return (
    <>
      <div
        className="cell"
        onClick={(e) => handleCellClick(cellData, cellData.x, cellData.y)}
        onContextMenu={(e) =>
          handleContextMenu(e, cellData, cellData.x, cellData.y)
        }
        key={cellData.x * 10 + cellData.y}
        value={cellData}
      >
        {flag && <p>&#x1F6A9;</p>}
        {(cellData.isRevealed && cellData.isMine) && <p>&#x1F4A3;</p>}
        {(cellData.isRevealed && cellData.neighbor !== 0) && cellData.neighbor}
      </div>
    </>
  );
};

export default Cell
