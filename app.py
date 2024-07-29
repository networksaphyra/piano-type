from flask import Flask, render_template, url_for, jsonify
import json

app = Flask(__name__)

def load_words():
  with open("words.json") as textFile:
    words = json.load(textFile)
    return words

words = load_words()

@app.route("/")
def index():
  return render_template("base.html")

@app.route("/api/words", methods=["GET"])
def get_words():
  print("request received...")
  return jsonify(words)

app.run(debug=True, host="0.0.0.0", port=8001)