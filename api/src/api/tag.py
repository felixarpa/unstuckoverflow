from flask import jsonify, request
from src.util import log
from src.db.sqlalchemy import db_session
from src.model.tag import Tag


def get(prefix_tag):
    try:
        tags = db_session().query(Tag).filter(Tag.name.ilike(prefix_tag + '%')).limit(10).all()
        return jsonify(error=False, response=[tag.serialize() for tag in tags]), 200
    except Exception as e:
        log.error('Unexpected error in GET/tag: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
