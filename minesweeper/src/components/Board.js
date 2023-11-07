import { useState, useRef } from "react"
import Cell from "./Cell"


const Board = ({height, width, mines, minesLeft}) => {

    const initializeBoard = () => {
        const board = []
        for (let i = 0; i < height; i++) {
            board.push([])
            for (let j = 0; j < width; j++) {
                board[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false
                }
            }
        }
        return board
    }


    const plantMines = (board) => {
        let randomx, randomy, minesPlanted = 0
        while (minesPlanted < mines) {
            randomx = Math.floor(Math.random() * width)
            randomy = Math.floor(Math.random() * height)

            if(!(board[randomy][randomx].isMine)) {
                board[randomx][randomy].isMine = true
                minesPlanted++
            }
        }
        return board
    }


    const findAdjacencies = (x, y, board) => {
        const el = []

        // Above
        if (x > 0) {
            el.push(board[x - 1][y])
        }
        // Below
        if (x < height - 1) {
            el.push(board[x + 1][y])
        }
        // Left
        if (y > 0) {
            el.push(board[x][y - 1])
        }
        // Right
        if (y < width - 1) {
            el.push(board[x][y + 1])
        }
        // Top left
        if (x > 0 && y > 0) {
            el.push(board[x - 1][y - 1])
        }
        // Top right
        if (x > 0 && y < width - 1) {
            el.push(board[x - 1][y + 1])
        }
        // Bottom right
        if (x < height - 1 && y < width - 1) {
            el.push(board[x + 1][y + 1])
        }
        // Bottom left
        if (x < height - 1 && y > 0) {
            el.push(board[x + 1][y - 1])
        }

        return el
    }
    const getNeighbors = (board, height, width) => {
        let updatedBoard = board
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (board[i][j].isMine !== true) {
                    let mineCount = 0;
                    const adjacencies = findAdjacencies(board[i][j].x, board[i][j].y, board)
                    adjacencies.map(val => {
                        if (val.isMine) {
                            mineCount++
                        }
                    })
                    if (mineCount === 0) {
                        updatedBoard[i][j].isEmpty = true
                    }
                    updatedBoard[i][j].neighbor = mineCount;
                }
            }
        }
        return updatedBoard
    }

    const makeGameBoard = () => {
        let board = initializeBoard()
        board = plantMines(board)
        board = getNeighbors(board, height, width)

        return board
    }

    const gameBoard = makeGameBoard()


    return (
        <>
        <div className="board">
            <div className="board-init">
                {gameBoard.map((row, indx) => {
                    return row.map((cell, indx) => {
                        return <Cell cellData={cell} minesLeft={minesLeft} />
                    }
                );
            })}
            </div>
        </div>
        </>
    )
}

export default Board