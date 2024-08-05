class Room:
  def __init__(self, id, players, settings):
    self.id = id
    self.player1 = players[0]
    self.player2 = players[1]
    self.settings = settings