from flask import jsonify, request

from src.model.tag import Tag
from src.model.user import User
from src.util import log
from src.db.sqlalchemy import db_session
from src.model.user_to_tag import UserToTag


def get(user_id):
    try:
        user_skills = db_session().query(UserToTag).filter_by(user_id=user_id).all()
        return jsonify(error=False, response=[user_skill.tag.serialize() for user_skill in user_skills]), 200
    except Exception as e:
        log.error('Unexpected error in GET/user/skills: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def post():
    try:
        body = request.json
        required_parameters = ['user_id', 'tag_name']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='All request body parameters are required.'), 400

        user = db_session().query(User).filter_by(id=body['user_id']).first()
        if not user:
            return jsonify(error=True, message='No user found with {} as id.'.format(body['user_id'])), 400

        tag = db_session().query(Tag).filter_by(name=body['tag_name']).first()
        if not tag:
            return jsonify(error=True, message='No tag found with {} as name.'.format(body['tag_name'])), 400

        user_tag = db_session().query(UserToTag).filter_by(user_id=body['user_id'], tag_id=tag.id).first()
        if not user_tag:
            user_tag = UserToTag(
                user_id=body['user_id'],
                tag_id=tag.id
            )
            db_session().add(user_tag)
            db_session().flush()
            db_session().commit()
        return jsonify(error=False, response=user_tag.serialize()), 200
    except Exception as e:
        log.error('Unexpected error in POST/user/skills: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def delete():
    try:
        body = request.json
        required_parameters = ['user_id', 'tag_id']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='All request body parameters are required.'), 400

        user = db_session().query(User).filter_by(id=body['user_id']).first()
        if not user:
            return jsonify(error=True, message='No user found with {} as id.'.format(body['user_id'])), 400

        tag = db_session().query(Tag).filter_by(id=body['tag_id']).first()
        if not tag:
            return jsonify(error=True, message='No tag found with {} as id.'.format(body['tag_id'])), 400

        user_tag = db_session().query(UserToTag).filter_by(user_id=body['user_id'], tag_id=body['tag_id']).first()
        if user_tag:
            db_session().delete(user_tag)
            db_session().commit()
            return jsonify(error=False, response='Deleted'), 200
        else:
            return jsonify(error=True, message='No skill found for {} as user id, and {} as skill_id'
                           .format(body['user_id'], body['tag_id'])), 400
    except Exception as e:
        log.error('Unexpected error in POST/user/skills: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
