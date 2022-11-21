import {useState, useRef} from 'react'
import './Board.css'
import Cell from './Cell'
import Pieces from './Pieces'
const size = 8;
const cellSize = 60;

const piecesLib = Pieces();

function Board(props){
    const [pieces, setPieces] = useState(piecesLib);
    const [currPiece, setCurrPiece] = useState(null)
    const [currX, setCurrX] = useState(0);
    const [currY, setCurrY] = useState(0);

    const boardRef = useRef(null);

    function grab(e){
        if (e.target.classList.contains('cellImage') && boardRef.current){
            const newX = Math.floor((e.clientX - boardRef.current.offsetLeft) / cellSize);
            const newY = Math.abs(Math.floor((e.clientY - boardRef.current.offsetTop) / cellSize));
            setCurrX(newX);
            setCurrY(newY);
            e.target.style.position = 'absolute';
            e.target.style.top = `${e.clientY - cellSize/2}px`;
            e.target.style.left = `${e.clientX - cellSize/2}px`;
            setCurrPiece(e.target);
        }
    }
    function drop(e){
        if(currPiece && boardRef.current){
            const newX = Math.floor((e.clientX - boardRef.current.offsetLeft ) / cellSize);
            const newY = Math.abs(Math.floor((e.clientY - boardRef.current.offsetTop) / cellSize));
            setPieces((newPieces) => {
                const pieces = newPieces.map((piece) => {
                    if (piece.x === currX && piece.y === currY){
                        piece.x = newX;
                        piece.y = newY;
                    };
                    
                    return piece;
                });
                return pieces;

            });

            setCurrPiece(null)
        }
    }
    function movePiece(e){
        if (currPiece && boardRef.current){
            let inBoardMinX = boardRef.current.offsetLeft - cellSize/4;
            let inBoardMinY = boardRef.current.offsetTop - cellSize/4;
            let inBoardMaxX = boardRef.current.offsetLeft + boardRef.current.clientWidth - cellSize*0.7;
            let inBoardMaxY = boardRef.current.offsetTop + boardRef.current.clientHeight - cellSize*0.7;

            currPiece.style.position = 'absolute';

            if (e.clientX - cellSize/2 < inBoardMinX){
                currPiece.style.left = `${inBoardMinX}px`
            } else if (e.clientX - cellSize/2 > inBoardMaxX){
                currPiece.style.left = `${inBoardMaxX}px`
            } else { currPiece.style.left = `${e.clientX - cellSize/2}px`}
            if (e.clientY - cellSize/2 < inBoardMinY){
                currPiece.style.top = `${inBoardMinY}px`
            } else if (e.clientY - cellSize/2 > inBoardMaxY){
                currPiece.style.top = `${inBoardMaxY}px`
            } else { currPiece.style.top = `${e.clientY - cellSize/2}px`}
        }
    }
    let board = [];
    for (let j = 0; j < size; j++){
        for (let i = 0; i < size; i++){
            let sum = i + j + 2;
            let image = undefined;
            let name = undefined;
            let key=`${i},${j}`
            pieces.forEach((piece) => {
                if(piece.x === i && piece.y === j){
                    image = piece.image
                    name = piece.figureName
                }
            })
            board.push(
                    <Cell key={key} type={sum} image={image} figureName={name}/>
                )

        }
    }
    return (
    <div 
        id='Board' 
        onMouseMove={e =>movePiece(e)} 
        onMouseDown={e=>grab(e)} 
        onMouseUp={e=>drop(e)}
        ref = {boardRef}
        >
        {board}
    </div>
    )

}
export default Board;
