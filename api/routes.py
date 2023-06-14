from flask import request
from api import app, db
from api.models import Task, Session
from sqlalchemy import text
from datetime import datetime, timedelta


@app.route('/')
def index():
    return app.send_static_file('index.html')


# Get all tasks
@app.route("/tasks", methods=["POST", "GET", "DELETE"])
def tasks():

    if request.method == "POST":
        data = Task(
            task=request.json["task"]
        )
        db.session.add(data)
        db.session.commit()

        return {"id": str(data.id), "task": str(data.task)}, 200
    if request.method == "DELETE":
        task_id = request.json['task_id']
        task_delete = text(f"""
            DELETE
            FROM tasks 
            WHERE id = '{task_id}'
        """)
        db.session.execute(task_delete)
        session_delete = text(f"""
            DELETE
            FROM sessions 
            WHERE task_id = '{task_id}'
        """)
        db.session.execute(session_delete)
        db.session.commit()

        return {"id": str(task_id)}, 201
    else:
        sql = text("select * from tasks")
        res = db.session.execute(sql).mappings().all()
        return_me = []
        for i in res:
            return_me.append(dict(i))

        return return_me
    

# Get all sessions for a task
@app.route("/sessions", methods=["POST", "GET"])
def sessions():
    if request.method == "POST":
        data = Session(
            task_id=request.json["task_id"],
            task=request.json["task"],
            run_time=request.json["run_time"],
            tempo=request.json["tempo"]
        )
        db.session.add(data)
        db.session.commit()

        return {"id": str(data.id), "task": str(data.task)}, 200
    

# Get total seconds spent on a task
@app.route("/task_total", methods=["GET"])
def task_total():

    task = request.args.get('task')
    sql = text(f"""
        SELECT SUM(run_time) as total_seconds
        FROM sessions 
        WHERE task = '{task}'
        GROUP BY task
    """)
    res = db.session.execute(sql).scalar()
    return {"totalSecs": res}


# Get tempo trend for a task
@app.route('/task_trend/', methods=['GET'])
def get_tempo_trend():

    task = request.args.get('task')
    sql = text(f"""
        SELECT 
            run_time, 
            tempo
        FROM sessions 
        WHERE task = '{task}'
        ORDER BY start_time
    """)
    
    res = db.session.execute(sql)
    return_me = []
    # prev_time = int(datetime.now().timestamp())
    prev_time = datetime.now()
    
    for idx, session in enumerate(res):
        d = {}
        d["idx"] = idx
        new_start_time = prev_time + timedelta(0,session[0])
        d["start_time"] = new_start_time
        d["run_time"] = session[0]
        d["tempo"] = session[1]
        prev_time = new_start_time
        return_me.append(d)
    
    return {"data": return_me}
