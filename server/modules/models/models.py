from database import db

# ユーザー情報クラスを作成my
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(30))
    create_date = db.Column(db.String(30))

# ポモドーロタイマー情報クラスを作成
class PomodoroTimers(db.Model):
      __tablename__ = 'pomodoro_timers'
      timer_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
      user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
      timer_name = db.Column(db.String(50), nullable=False)
      timer_description = db.Column(db.String(200))
      work_length = db.Column(db.Integer, nullable=False)
      break_length = db.Column(db.Integer, nullable=False)
      rounds = db.Column(db.Integer, nullable=False)
      work_sound_source = db.Column(db.String(200))
      break_sound_source = db.Column(db.String(200))
      isPublic = db.Column(db.Boolean, nullable=False)

# 作業時間情報クラスを作成
class WorkTimes(db.Model):
    __tablename__ = 'work_times'
    work_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    work_length = db.Column(db.Integer)
    start_time = db.Column(db.String(30))
    end_time = db.Column(db.String(30))
