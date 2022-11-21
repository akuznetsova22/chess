import './App.css';
import Board from './components/Board'
import {useState} from 'react'
import {Chess} from 'chess.js'


function App() {
  const [game, setGame] = useState(new Chess());
  console.log(game);

  function updateGameState (modify){
    setGame((currGame) => {
      const newUpdate = {...currGame}
      modify(newUpdate);
      return newUpdate
    })
  }
  function computerMove(){
    const possibleMoves = game.move();
    if (possibleMoves.length === 0 || game.game_over()|| game.in_draw()){
      return
    } else {
      const moveIdx = Math.floor(Math.random() * possibleMoves.length );
      updateGameState((game) => {
        game.move(possibleMoves[moveIdx])
      })
    }
  }
  function onDrop(source, destination){
    let move = null;
    updateGameState((game) => {
      move = game.move({
        from: source,
        to: destination,
        promotion: 'q'
      })
    })
    if (move===null){
      return false
    }
    //MAKE COMPUTER MOVE for COMPUTER GAME
    // setTimeout(computerMove, GIVEN INTERVAL)
    //WAIT FOR OTHER PLAYER IF 2 PEOPLE GAME
  }
  return (
    <div className="App">
      <Board
      //position = {game.fen()}
      //onDrop = {onDrop}
      />
    </div>
  );
}

export default App;
