from bs4 import BeautifulSoup
from flask import jsonify, request

from src.model.user import User
from src.model.user_to_tag import UserToTag
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

        soup = BeautifulSoup(body['page_html'], 'html.parser')
        tag_list = list(set(list(soup.find_all('a', {'class': 'post-tag'}))))

        skills = {}
        company_mates = db_session().query(User).filter_by(company=user.company).all()
        for mate in company_mates:
            if mate.id != user.id:
                mate_skills = db_session().query(UserToTag).filter_by(user_id=mate.id).all()
                mate_skills = [skill.tag.name for skill in mate_skills]
                skills[mate.id] = [tag for tag in tag_list if tag in mate_skills]

        maximum = 0
        maximum_mate = None
        maximum_list = None
        for mate, skill_list in skills.items():
            if len(skill_list) > maximum:
                maximum = len(skill_list)
                maximum_mate = mate
                maximum_list = skill_list

        user = db_session().query(User).filter_by(id=maximum_mate).first()
        response = dict(user=user.serialize(), skills=maximum_list)
        return jsonify(error=False, response=response), 200
    except Exception as e:
        log.error('Unexpected error in POST/help: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
