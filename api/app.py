import datetime
import os
from flask import Flask, request
from extensions import db
from models import Task
from flask_cors import CORS

APP_CONFIG = os.environ["APP_SETTINGS"]


def register_extensions(app):
    db.init_app(app)


def create_app():
    app = Flask(__name__)
    app.config.from_object(APP_CONFIG)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    register_extensions(app)
    CORS(app)
    return app


app = create_app()

import routes


if __name__ == '__main__':
    app.run(host='0.0.0.0')
