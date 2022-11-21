import { ClientMessageType, ServerMessageType } from "./message-type.js"

class GameClient {
  #serverUrl
  #gameStarted
  #moveReceived
  #gameEnded
  /** @type {WebSocket} */
  #websocket

  constructor(serverUrl, gameStarted, moveReceived, gameEnded) {
    this.#serverUrl = serverUrl;
    this.#gameStarted = gameStarted;
    this.#moveReceived = moveReceived;
    this.#gameEnded = gameEnded;
  }

  initGame(boardSize) {
    this.#websocket = new WebSocket(this.#serverUrl);
    this.#websocket.addEventListener('open', () => {
      const message = {
        type: ClientMessageType.Init,
        boardSize
      };
      this.#websocket.send(JSON.stringify(message));      
      this.#websocket.addEventListener('message', e => {
        this.#receiveMessages(e);
      });
    });
  }

  joinGame() {
    this.#websocket = new WebSocket(this.#serverUrl);
    this.#websocket.addEventListener('open', () => {
      const message = {
        type: ClientMessageType.Join        
      };
      this.#websocket.send(JSON.stringify(message));
      this.#websocket.addEventListener('message', e => {
        this.#receiveMessages(e); 
      });
    });
  }

  #receiveMessages(e) {   
    const message = JSON.parse(e.data);
    console.log(message);

    switch (message.type) {
      case ServerMessageType.GameStart:
        this.#gameStarted(message.boardSize);
        break;
      case ServerMessageType.Play:
        this.#moveReceived(message.player, message.row, message.column);
        break;     
      case ServerMessageType.GameFinished:
        this.#gameEnded(message.winner);
        this.#websocket.close();
        break;
      case ServerMessageType.InvalidMove:
      case ServerMessageType.Error:
        alert(message.error);
        break;
      default:
        throw new Error(`Invalid message type: ${message.type}`);
    }
  }

  sendMove(row, column) {
    const message = {
      type: ClientMessageType.Play,
      row,
      column
    };
    this.#websocket.send(JSON.stringify(message));
  }
}

export default GameClient;