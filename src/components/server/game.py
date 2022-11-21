from board import Board 

class Game:
  def __init__(self, board_size=64) -> None:
    self.board_size = board_size
    self.board = Board(board_size)    
  
  def play_move(self, row, column, player):
    self.board[row, column] = player

  def is_valid_move(self, row, column):
    if row < 0 or row >= self.board_size or column < 0 or column >= self.board_size:
      return False
    return self.board.is_valid_move(row, column)

  def get_winner(self):
    return self.board.get_winner()