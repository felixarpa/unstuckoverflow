from flask import jsonify, request
from src.util import log


def get():
    try:
        return 'You made it!'
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
