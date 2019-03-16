from flask import jsonify, request
from src.util import log


def get(prefix_tag):
    try:
        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in GET/tag: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
