import numpy as np
from player import Player

class Board:
  EMPTY_CELL = 0
  DRAW = 0

  def __init__(self, size=8) -> None:
    self.size = size
    self.mat = np.zeros((size, size), dtype=np.int8)

  def __getitem__(self, position):
    return self.mat[position[0], position[1]]

  def __setitem__(self, position, player):
    self.mat[position[0], position[1]] = player

  def is_valid_move(self, row, column):
    return self.mat[row, column] == Board.EMPTY_CELL

  def get_winner(self):
    # Check rows
    if np.any(np.all(self.mat == Player.X, axis=1)):
      return Player.X
    if np.any(np.all(self.mat == Player.O, axis=1)):
      return Player.O
    
    # Check columns
    if np.any(np.all(self.mat == Player.X, axis=0)):
      return Player.X
    if np.any(np.all(self.mat == Player.O, axis=0)):
      return Player.O

    # Check diagonals
    main_diagonal = np.diag(self.mat)
    if np.all(main_diagonal == Player.X):
      return Player.X
    if np.all(main_diagonal == Player.O):
      return Player.O

    secondary_diagonal = np.diag(self.mat[:, ::-1])
    if np.all(secondary_diagonal == Player.X):
      return Player.X
    if np.all(secondary_diagonal == Player.O):
      return Player.O

    if not np.any(self.mat == Board.EMPTY_CELL):
      return Board.DRAW
    
    return None

