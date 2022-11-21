//import Board from "./board.js";
import Board from '../Board.js'
import GameClient from "./game-client.js";
import Player from "./player.js";

const connectForm = document.getElementById('connect-form');
const btnStartGame = document.getElementById('start-game');
const btnJoinGame = document.getElementById('join-game');
const waitMessage = document.getElementById('wait-message');
const gameArea = document.getElementById('game-area');
const boardElement = document.getElementById('board');
const statusBar = document.getElementById('status');

const url = 'ws://localhost:8080';
const client = new GameClient(url, gameStarted, moveReceived, gameEnded);

let currPlayer;
/** @type {Board} */
let board;
const boardSize = 8;

btnStartGame.addEventListener('click', () => {
  currPlayer = Player.X;
  client.initGame(boardSize);
  connectForm.hidden = true;
  waitMessage.hidden = false;
});

btnJoinGame.addEventListener('click', () => {
  currPlayer = Player.O;
  client.joinGame();
  connectForm.hidden = true;
});

function gameStarted(boardSize) {
  waitMessage.hidden = true;
  gameArea.hidden = false;
  board = new Board(boardSize, boardElement, currPlayer, movePlayed);
  board.draw();
}

function moveReceived(player, row, column) {
  board.updateBoard(player, row, column);
}

function gameEnded(winner) {
  let gameEndMessage;
  if (winner) {
    gameEndMessage = `Player ${winner} wins!`;
  } else {
    gameEndMessage = 'Game ended in a draw';
  }
  alert(gameEndMessage);
}

function movePlayed(row, column) {
  client.sendMove(row, column);
}


