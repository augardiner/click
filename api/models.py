from datetime import datetime
from api import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String())


    def __init__(self, task):
        self.task = task
    
    def __repr__(self):
        return str({
            "id": self.id, 
            "task": self.task
        })
    
class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer)
    task = db.Column(db.String())
    run_time = db.Column(db.Integer)
    tempo = db.Column(db.Integer)


    def __init__(self, task, task_id, run_time, tempo):
        self.task = task
        self.task_id = task_id
        self.run_time = run_time
        self.tempo = tempo
        
    
    def __repr__(self):
        return str({
            "id": self.id, 
            "task": self.task
        })
    