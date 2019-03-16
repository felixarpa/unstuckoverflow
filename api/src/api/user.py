from flask import jsonify, request
from src.util import log
from src.db.sqlalchemy import db_session
from src.model.user import User


def get(user_id):
    try:
        user = db_session().query(User).filter_by(id=user_id).first()
        if user:
            response = user.serialize()
            return jsonify(error=False, response=response), 200
        else:
            return jsonify(error=True, message='No user found with {} as id.'.format(user_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def post():
    try:
        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in POST/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def put():
    try:
        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in PUT/user: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def login_post():
    try:
        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in POST/user/login: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
