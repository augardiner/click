from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# init app
app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

# database
dbURL = "postgresql://postgres:postgres@postgres:5432/db"

app.config['SQLALCHEMY_DATABASE_URI'] = dbURL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initialize db and ma
db = SQLAlchemy(app)

from api import routes
