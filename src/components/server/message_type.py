from enum import IntEnum

class MessageType(IntEnum):
  GameStart = 1
  Play = 2
  InvalidMove = 3
  GameFinished = 4
  Error = 5