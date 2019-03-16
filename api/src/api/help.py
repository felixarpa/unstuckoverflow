from flask import jsonify, request

from src.model.user import User
from src.util import log
from src.db.sqlalchemy import db_session


def post():
    try:
        body = request.json
        required_parameters = ['page_html', 'user_id']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='All request body parameters are required.'), 400

        user = db_session().query(User).filter_by(id=body['user_id']).first()
        if not user:
            return jsonify(error=True, message='No user found with {} as id.'.format(body['user_id'])), 400

        return 'You made it'
    except Exception as e:
        log.error('Unexpected error in POST/help: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
