from flask import Blueprint, jsonify, request
from database import db
from modules.models import PomodoroTimers

timer_handle_app = Blueprint('timer', __name__)

# 受け取ったポモドーロタイマーをポモドーロタイマーテーブルに登録する
@timer_handle_app.route('/api/timer', methods=['POST'])
def insert_timer():
    data = request.get_json()
    if data['isPublic'] == 'true':
        data['isPublic'] = True
    else:
        data['isPublic'] = False
    
    pomodoro_timer = PomodoroTimers(
      timer_name = data['timer_name'],
      timer_description = data['timer_description'],
      work_length = data['work_length'],
      break_length = data['break_length'],
      rounds = data['rounds'],
      work_sound_source = data['work_sound_source'],
      break_sound_source = data['break_sound_source'],
      isPublic = data['isPublic']
    )
    db.session.add(pomodoro_timer)
    db.session.commit()
    return jsonify({'message': 'Pomodoro Timer added successfully'})

# 受け取ったポモドーロタイマーをポモドーロタイマーテーブルから削除する
@timer_handle_app.route('/api/timer/<int:id>', methods=['DELETE'])
def delete_timer():
    pomodoro_data = request.get_json()
    pomodoro_timer = PomodoroTimers.query.filter_by(pomo_id=pomodoro_data['pomo_id']).first()
    db.session.delete(pomodoro_timer)
    db.session.commit()
    return jsonify({'message': 'Pomodoro Timer deleted successfully'})

# ポモドーロタイマーテーブルの全データを取得する
# 引数:なし　返却値:'pomodoro_timers': pomo_id, title, maker_user_id, work_length, work_music, break_length, break_musicのリスト
@timer_handle_app.route('/api/timer', methods=['GET'])
def get_all_timers():
    pomodoro_timers = PomodoroTimers.query.all()
    pomodoro_timer_list = []
    for pomodoro_timer in pomodoro_timers:
        pomodoro_timer_list.append({
            'pomo_id': pomodoro_timer.pomo_id,
            'title': pomodoro_timer.title,
            'maker_user_id': pomodoro_timer.maker_user_id,
            'work_length': pomodoro_timer.work_length,
            'work_music': pomodoro_timer.work_music,
            'break_length': pomodoro_timer.break_length,
            'break_music': pomodoro_timer.break_music
        })
    return jsonify({'pomodoro_timers': pomodoro_timer_list})

# ポモドーロタイマーテーブルで指定したユーザーIDのデータを取得する
# 引数:'user_id'=ユーザID　返却値:'pomodoro_timers': pomo_id, title, maker_user_id, work_length, work_music, break_length, break_musicのリスト
@timer_handle_app.route('/api/timer/<int:id>', methods=['GET'])
def get_timers_by_id():
    user_id = request.args.get('user_id')
    pomodoro_timers = PomodoroTimers.query.filter_by(maker_user_id=user_id).all()
    pomodoro_timer_list = []
    for pomodoro_timer in pomodoro_timers:
        pomodoro_timer_list.append({
            'pomo_id': pomodoro_timer.pomo_id,
            'title': pomodoro_timer.title,
            'maker_user_id': pomodoro_timer.maker_user_id,
            'work_length': pomodoro_timer.work_length,
            'work_music': pomodoro_timer.work_music,
            'break_length': pomodoro_timer.break_length,
            'break_music': pomodoro_timer.break_music
        })
    return jsonify({'pomodoro_timers': pomodoro_timer_list})