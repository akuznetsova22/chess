import websockets
from websockets.client import WebSocketClientProtocol
import logging
import json
import asyncio
from player import Player
from game import Game
from message_type import MessageType

class GameServer:
  def __init__(self, ip, port) -> None:
    self.ip = ip
    self.port = port
    self.clients = set()
    self.first_player_connected = False

  async def client_handler(self, websocket: WebSocketClientProtocol):
    """Handle a client connection
    Args:
        websocket (WebSocketClientProtocol): _description_
    """
    self.clients.add(websocket)

    if not self.first_player_connected:

      # Get the first message with the board size
      message = await websocket.recv()
      self.game_settings = json.loads(message)
      self.first_player_connected = True

      await self.play(websocket, Player.X) 
    else:
      await websocket.recv()
      self.start_game()
      await self.play(websocket, Player.O)

  def start_game(self):
    """Start a new game
    """
    #board_size = self.game_settings['boardSize']
    self.game = Game()
    

    # Send a message to both players that the game has started
    message = {
      'type': MessageType.GameStart,
      #'boardSize': board_size
    }    
    logging.info(self.clients)
    websockets.broadcast(self.clients, json.dumps(message))

  async def play(self, websocket: WebSocketClientProtocol, player):
    """Receive and process moves from a player

    Args:
        websocket (WebSocketClientProtocol): _description_
        player (_type_): _description_
    """
    try:
      while True:
        move_message = await websocket.recv()
        # Parse the move object from the message
        move = json.loads(move_message)
        row = move['row']
        column = move['column']
        logging.info(f'Received move: {row}, {column}')

        if self.game.is_valid_move(row, column):
          # Handle a valid move
          self.game.play_move(row, column, player)
          
          # Send a "play" message to both players
          message = {
            'type': MessageType.Play,
            'player': player,
            'row': row,
            'column': column
          }
          websockets.broadcast(self.clients, json.dumps(message))

          # Check if the game has ended
          winner = self.game.get_winner()
          if winner is not None:
            # Send a GameFinished message to both players
            message = {
              'type': MessageType.GameFinished,
              'winner': winner
            }
            websockets.broadcast(self.clients, json.dumps(message))
            break
        else:
          # Handle an invalid move
          message = {
            'type': MessageType.InvalidMove,
            'error': 'Illegal move'
          }
          await websocket.send(json.dumps(message))
    except Exception as e:      
      message = {
        'type': MessageType.Error,
        'error': e
      }
      websockets.broadcast(self.clients, json.dumps(message))
    finally:
      self.clients.remove(websocket)

  async def start(self):
    async with websockets.serve(self.client_handler, self.ip, self.port):
      logging.info('Server started')
      await asyncio.Future()