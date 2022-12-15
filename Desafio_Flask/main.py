from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from views import *


app = Flask(__name__)
db = SQLAlchemy(app)
app.config.from_pyfile("config.py")

if __name__ == "__main__":
    app.run(debug = True)