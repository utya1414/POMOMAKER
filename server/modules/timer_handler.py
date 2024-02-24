from flask import Blueprint, jsonify, request
from database import db
from modules.models import Timers
from flask_login import current_user
timer_handle_app = Blueprint('timer', __name__)

# request_body: { 
#         "timer_id": timer_id,
#         "timer_name": timer_name,
#         "timer_description": timer_description,
#         "work_length": work_length,
#         "break_length": break_length,
#         "rounds": rounds,
#         "work_sound_source": work_sound_source,
#         "break_sound_source": break_sound_source,
#         "isPublic": isPublic 
#       }
@timer_handle_app.route('/api/timer', methods=['POST'])
def insert_timer():
    data = request.get_json()
    if data['isPublic'] == 'true':
        data['isPublic'] = True
    else:
        data['isPublic'] = False
    
    timer = Timers(
      user_id = current_user.user_id,
      timer_name = data['timer_name'],
      timer_description = data['timer_description'],
      work_length = data['work_length'],
      break_length = data['break_length'],
      rounds = data['rounds'],
      work_sound_source = data['work_sound_source'],
      break_sound_source = data['break_sound_source'],
      isPublic = data['isPublic']
    )
    db.session.add(timer)
    db.session.commit()
    return jsonify({
        "status": "success",
        'message': 'Pomodoro Timer added successfully'})


# response: { timer_info1, timer_info2, ...}
@timer_handle_app.route('/api/timer', methods=['GET'])
def get_all_timers():
    timers = Timers.query.all()
    timer_list = []
    for timer in timers:
        timer_list.append({
            'timer_id': timer.timer_id,
            'user_id': timer.user_id,
            'timer_name': timer.timer_name,
            'timer_description': timer.timer_description,
            'work_length': timer.work_length,
            'break_length': timer.break_length,
            'rounds': timer.rounds,
            'work_sound_source': timer.work_sound_source,
            'break_sound_source': timer.break_sound_source,
            'isPublic': timer.isPublic
        })
    return jsonify({
        "status": "success",
        "message": "Pomodoro Timers fetched all successfully",
        "data": {
            "timers": timer_list
        }
    })

@timer_handle_app.route('/api/timer/<int:id>', methods=['GET'])
def get_timer_by_id(id):
    timer = Timers.query.filter_by(timer_id=id).first()
    if not timer:
        return jsonify({'message': 'Timer not found'})
    return jsonify(
        {
            "status": "success",
            "message": "Pomodoro Timer fetched successfully",
            "data": {
                "timer": {
                    'timer_id': timer.timer_id,
                    'user_id': timer.user_id,
                    'timer_name': timer.timer_name,
                    'timer_description': timer.timer_description,
                    'work_length': timer.work_length,
                    'break_length': timer.break_length,
                    'rounds': timer.rounds,
                    'work_sound_source': timer.work_sound_source,
                    'break_sound_source': timer.break_sound_source,
                    'isPublic': timer.isPublic
                
                }
            }
        })

@timer_handle_app.route('/api/timer/<int:id>', methods=['PUT'])
def update_timer(id):
    timer = Timers.query.filter_by(timer_id=id).first()
    data = request.get_json()
    if data['isPublic'] == 'true':
        data['isPublic'] = True
    else:
        data['isPublic'] = False
        
    timer.timer_name = data['timer_name']
    timer.timer_description = data['timer_description']
    timer.work_length = data['work_length']
    timer.break_length = data['break_length']
    timer.rounds = data['rounds']
    timer.work_sound_source = data['work_sound_source']
    timer.break_sound_source = data['break_sound_source']
    timer.isPublic = data['isPublic']
    db.session.commit()
    return jsonify({
        "status": "success",
        'message': 'Pomodoro Timer updated successfully'})


@timer_handle_app.route('/api/timer/<int:id>', methods=['DELETE'])
def delete_timer(id):
    timer = Timers.query.filter_by(timer_id=id).first()
    db.session.delete(timer)
    db.session.commit()
    return jsonify({
        "status": "success",
        'message': 'Pomodoro Timer deleted successfully'})