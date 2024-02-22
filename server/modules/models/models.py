from database import db
from flask_login import UserMixin

# ユーザー情報クラスを作成
class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(200))
    user_name = db.Column(db.String(30))
    description = db.Column(db.String(200))
    created_at = db.Column(db.String(30))
    updated_at = db.Column(db.String(30))

    def get_id(self):
        return self.user_id

# ポモドーロタイマー情報クラスを作成
class PomodoroTimers(db.Model):
      __tablename__ = 'pomodoro_timers'
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
    __tablename__ = 'work_times'
    work_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    work_length = db.Column(db.Integer)
    start_time = db.Column(db.String(30))
    end_time = db.Column(db.String(30))
