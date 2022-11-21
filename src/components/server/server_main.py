from game_server import GameServer
import asyncio

server = GameServer('localhost', 8080)
asyncio.run(server.start())