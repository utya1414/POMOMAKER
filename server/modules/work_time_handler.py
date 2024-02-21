from flask import Blueprint, jsonify, request
from modules.tables import db, WorkTimes
from datetime import datetime

work_time_handle_app = Blueprint('work_time', __name__)

# 作業時間情報に作業開始を登録する
# 引数:'user_id'=ユーザID　返却値:'work_id': 作業時間ID
@work_time_handle_app.route('/api/work_time/start', methods=['POST'])
def start_work_time():
    work_time_data = request.get_json()
    time_now = datetime.now()
    work_time = WorkTimes(
        user_id=work_time_data['user_id'],
        start_time=time_now
    )
    db.session.add(work_time)
    db.session.commit()
    return jsonify({'work_id': work_time.work_id})

# 作業時間情報に作業終了を登録する
# 引数:'work_id'=作業時間ID　返却値:単なる文字列
@work_time_handle_app.route('/api/work_time/end', methods=['POST'])
def end_work_time():
    work_time_data = request.get_json()
    work_time = WorkTimes.query.filter_by(work_id=work_time_data['work_id']).first()
    time_now = datetime.now()
    start_time = datetime.strptime(work_time.start_time, '%Y-%m-%d %H:%M:%S.%f')
    work_time.end_time = time_now
    work_time.work_length = (time_now - start_time).seconds
    db.session.commit()
    return jsonify({'message': 'Work Time updated successfully'})

# 受け取った作業時間情報を作業時間情報テーブルから削除する
# 引数:'work_id'=作業時間ID　返却値:単なる文字列
@work_time_handle_app.route('/api/work_time', methods=['DELETE'])
def delete_work_time():
    work_time_data = request.get_json()
    work_time = WorkTimes.query.filter_by(work_id=work_time_data['work_id']).first()
    db.session.delete(work_time)
    db.session.commit()
    return jsonify({'message': 'Work Time deleted successfully'})

# 作業時間情報テーブルの全データを取得する
# 引数:なし　返却値:'work_times': work_id, user_id, work_time, start_time, end_timeのリスト
@work_time_handle_app.route('/api/work_time', methods=['GET'])
def get_work_times():
    work_times = WorkTimes.query.all()
    work_time_list = []
    for work_time in work_times:
        work_time_list.append({
            'work_id': work_time.work_id,
            'user_id': work_time.user_id,
            'work_time': work_time.work_time,
            'start_time': work_time.start_time,
            'end_time': work_time.end_time
        })
    return jsonify({'work_times': work_time_list})

# 作業時間情報テーブルで指定したユーザーIDのデータを取得する
# 引数:'user_id'=ユーザID　返却値:'work_times': work_id, user_id, work_time, start_time, end_timeのリスト
@work_time_handle_app.route('/api/work_time/user', methods=['GET'])
def get_work_times_by_user():
    user_id = request.args.get('user_id')
    work_times = WorkTimes.query.filter_by(user_id=user_id).all()
    work_time_list = []
    for work_time in work_times:
        work_time_list.append({
            'work_id': work_time.work_id,
            'user_id': work_time.user_id,
            'work_time': work_time.work_time,
            'start_time': work_time.start_time,
            'end_time': work_time.end_time
        })
    return jsonify({'work_times': work_time_list})
