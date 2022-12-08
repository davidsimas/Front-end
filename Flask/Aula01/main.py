# Primeiro importamos a Flaskclasse. 
from flask import Flask

app = Flask(__name__)

@app.route("/")
def inicio():
    return "<h1> Titulo More Devs </h1>"


@app.route("/novo")
def novo():
    return "Titulo Rota Nova1"

app.run()