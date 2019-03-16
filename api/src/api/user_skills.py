from flask import jsonify, request
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


def post(user_id, tag_id):
    try:
        usuari_tag = UserToTag(
            user_id=user_id,
            tag_id=tag_id
        )
        db_session().add(usuari_tag)
        db_session().flush()
        db_session().commit()
        return jsonify(error=False, response=''), 200
    except Exception as e:
        log.error('Unexpected error in POST/user/skills: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
