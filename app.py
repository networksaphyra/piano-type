from flask import Flask, render_template, url_for, jsonify
from time import time
from flask import session
from flask_socketio import emit, join_room, leave_room, SocketIO

from player import Player
from room import Room
from typing import List
import json
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

queue : List[Player] = []
matchup : List[Player] = []
def load_words():
  with open("words.json") as textFile:
    words = json.load(textFile)
    return words

words = load_words()

@app.route("/typing_test", methods=["GET"])
def typingTest():
   return render_template("base.html")

@app.route("/", methods=["GET"])
def index():
  return render_template("chat.html")

@app.route("/api/words", methods=["GET"])
def get_words():
  print("request received...")
  return jsonify(words)

@app.route("/api/login", methods=["GET"])
def login():
  playerId = random.randint(0, 1239031)
  return {"id": playerId, "rating": 1}

@app.route('/api/match', methods=["GET"])
def match(req):
  playerJson = req.json
  queue.append(Player(playerJson.id, playerJson.rating))

  # TODO: cooler matchmaking
  if len(queue) == 2:
    player = queue[1]
    opponent = queue[0]

    matchup = [player, opponent]

    return {
            "result": "matched", 
            "player": {"id": player.id, "rating": player.rating}, 
            "opponent": {"id": opponent.id, "rating": opponent.rating}
          }
  elif len(queue) == 1:
    return {"result": "waiting"}

@socketio.on('connect', namespace='/chat')
def connect():
    return

@socketio.on('joined', namespace='/chat')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {
        'msg': f"{session.get('name')} has entered the room.",
    }, to=room)


@socketio.on('text', namespace='/chat')
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room = session.get('room')
    emit('message', {
        'msg': f"{session.get('name')}: {message['msg']}",
    }, to=room)
    print(f"message: {message['msg']}")


@socketio.on('left', namespace='/chat')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {
        'msg': f"{session.get('name')} has left the room.",
    }, to=room)

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=8001)