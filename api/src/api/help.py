from flask import jsonify, request
from src.util import log


def post():
    try:
        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in POST/help: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
