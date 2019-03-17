from flask import jsonify, request

from src import *
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
        body = request.json
        required_parameters = ['full_name', 'email', 'password', 'phone_number']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='All request body parameters are required.'), 400

        username, domain = body['email'].lower().split('@')
        company = domain.split('.')[0]
        if company in NO_COMPANY_EMAILS:
            return jsonify(error=True, message='Specified email is not a company email.'), 400

        user = db_session().query(User).filter_by(username=username, company=company).first()
        if user:
            return jsonify(error=True, message='The user already exists.'), 400

        user = User(
            username=username,
            company=company,
            full_name=body['full_name'],
            email=body['email'],
            password=body['password'],
            phone_number=body['phone_number']
        )
        db_session().add(user)
        db_session().commit()

        return jsonify(error=False, response=user.serialize()), 200
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
        body = request.json
        required_parameters = ['email', 'password']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='{} are required parameters.'.format(required_parameters)), 400

        username, domain = body['email'].lower().split('@')
        company = domain.split('.')[0]
        user = db_session().query(User).filter_by(username=username, company=company).first()
        if user:
            password = user.password
            if password == body['password'].lower():
                return jsonify(error=False, response=user.id), 200
            else:
                return jsonify(error=True, message='The password is not correct'), 400
        else:
            return jsonify(error=True, message='No user found with {} as email.'.format(body['email'])), 400
    except Exception as e:
        log.error('Unexpected error in POST/user/login: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
