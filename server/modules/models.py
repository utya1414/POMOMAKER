from flask_sqlalchemy import SQLAlchemy

# SQLAlchemyのインスタンスを作成
db = SQLAlchemy()

# ユーザー情報クラスを作成
class Users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(30))
    create_date = db.Column(db.String(30))

# ポモドーロタイマー情報クラスを作成
class PomodoroTimers(db.Model):
      timer_name = db.Column(db.String(50), primary_key=True)
      timer_description = db.Column(db.String(200))
      work_length = db.Column(db.Integer)
      break_length = db.Column(db.Integer)
      rounds = db.Column(db.Integer)
      work_sound_source = db.Column(db.String(200))
      break_sound_source = db.Column(db.String(200))
      isPublic = db.Column(db.Boolean)

# 作業時間情報クラスを作成
class WorkTimes(db.Model):
    work_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    work_length = db.Column(db.Integer)
    start_time = db.Column(db.String(30))
    end_time = db.Column(db.String(30))
