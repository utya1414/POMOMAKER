import sqlite3
import os

current_directory = os.path.dirname(__file__)                   # カレントディレクトリを取得
db_path = os.path.join(current_directory, 'instance/sample.db') # データベースファイルのパスを作成

conn = sqlite3.connect(db_path) # データベース接続を作成 (ファイルが存在しない場合は新たに作成される)
c = conn.cursor()               # カーソルオブジェクトを作成

# Userテーブルを作成するSQLクエリ
create_table_query1 = """
CREATE TABLE IF NOT EXISTS users (
    USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_NAME TEXT NOT NULL,
    CREATE_DATE TEXT NOT NULL
);
"""
c.execute(create_table_query1)

# PomodoroTimerテーブルを作成するSQLクエリ
create_table_query2 = """
CREATE TABLE IF NOT EXISTS pomodoro_timers (
    POMO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    TITLE TEXT NOT NULL,
    MAKER_USERID INTEGER NOT NULL,
    WORK_LENGTH INTEGER,
    WORK_MUSIC TEXT,
    BREAK_LENGTH INTEGER,
    BREAK_MUSIC TEXT
);
"""
c.execute(create_table_query2)

# WorkTimeテーブルを作成するSQLクエリ
create_table_query3 = """
CREATE TABLE IF NOT EXISTS work_times (
    WORK_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INTEGER NOT NULL,
    WORK_LENGTH INTEGER,
    START_TIME TEXT,
    END_TIME TEXT
);
"""
c.execute(create_table_query3)

# ユーザーデータを挿入するためのSQLクエリとデータ
insert_user_query = """
INSERT INTO users (USER_NAME, CREATE_DATE)
VALUES (?, ?)
"""
user_data = [
    ('user_name1', '2021-01-01 00:11:22.012345'),
    ('user_name2', '2021-01-02 00:11:22.012345'),
    ('user_name3', '2021-01-03 00:11:22.012345'),
    ('user_name4', '2021-01-04 00:11:22.012345'),
    ('user_name5', '2021-01-05 00:11:22.012345')
]
c.executemany(insert_user_query, user_data) # ユーザーデータを挿入

# ポモドーロタイマーデータを挿入するためのSQLクエリとデータ
insert_pomodoro_timer_query = """
INSERT INTO pomodoro_timers (TITLE, MAKER_USERID, WORK_LENGTH, WORK_MUSIC, BREAK_LENGTH, BREAK_MUSIC)
VALUES (?, ?, ?, ?, ?, ?)
"""
pomodoro_timer_data = [
    ('timer_title1', 1, 25, 'music1', 5, 'music2'),
    ('timer_title2', 2, 25, 'music3', 5, None),
    ('timer_title3', 3, 25, None, 5, None),
    ('timer_title4', 1, 50, None, 10, None),
    ('timer_title5', 2, 50, None, None, None),
    ('timer_title6', 3, None, None, None, None)
]
c.executemany(insert_pomodoro_timer_query, pomodoro_timer_data) # ポモドーロタイマーデータを挿入

# 作業時間データを挿入するためのSQLクエリとデータ
insert_work_time_query = """
INSERT INTO work_times (USER_ID, WORK_LENGTH, START_TIME, END_TIME)
VALUES (?, ?, ?, ?)
"""

work_time_data = [
    (1, 25, '2021-01-01 00:11:22.012345', '2021-01-01 00:36:22.012345'),
    (2, 25, '2021-01-02 00:11:22.012345', '2021-01-02 00:36:22.012345'),
    (3, 1125, '2021-01-03 00:11:22.012345', '2021-01-03 00:36:22.012345'),
    (4, 1150, '2021-01-04 00:11:22.012345', '2021-01-04 00:36:22.012345'),
    (5, 1150, '2021-01-05 00:11:22.012345', '2021-01-05 00:36:22.012345')
]
c.executemany(insert_work_time_query, work_time_data) # 作業時間データを挿入

# 変更をコミットして接続を閉じる
conn.commit()
conn.close()
print("データベース及びテーブルの作成が完了しました")

# {
#   "timer_name": "test_api_timer",
#   "timer_description": "test",
#   "work_length": 25,
#   "break_length": 5,
#   "rounds": 4,
#   "work_sound_source": "",
#   "break_sound_source": "",
#   "isPublic": false
# }

# insert into pomodoro_timers (timer_name, timer_description, work_length, break_length, rounds, work_sound_source, break_sound_source, isPublic) values ('test_api_timer', 'test', 25, 5, 4, '', '', false);