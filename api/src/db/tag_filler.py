import csv

from src import *
from src.db.sqlalchemy import db_session
from src.model.tag import Tag
from src.util import log


def init_tag_table():
    existing_tags = db_session().query(Tag).first()
    if not existing_tags:
        log.info('There are no tags in the DB. Initializing...')
        with open(TAG_CSV_FILE, newline='') as f:
            tags_to_add = [row[0] for idx, row in enumerate(csv.reader(f)) if idx != 0]

        log.info('{} tags to add.'.format(len(tags_to_add)))
        for idx, tag_name in enumerate(tags_to_add):
            tag = Tag(name=tag_name)
            db_session().add(tag)
            db_session().flush()
            log.info('{}/{} Tag added -> ID: {} | Name: {}'.format(idx + 1, len(tags_to_add), tag.id, tag.name))
        db_session().commit()
        log.info('Done!')

        existing_tags = db_session().query(Tag).all()
        log.info('Tags amount: [{}]'.format(len(existing_tags)))
    else:
        log.info('There are already tags in the DB. Doing nothing.')


if __name__ == '__main__':
    init_tag_table()
