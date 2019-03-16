import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db.sqlalchemy import Base
from src.model.tag import Tag
from src.model.user import User


class UserToTag(Base):
    __tablename__ = 'unstuckoverflow_user_to_tag'

    user_id = db.Column(db.Integer, db.ForeignKey('unstuckoverflow_user.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('unstuckoverflow_tag.id'), primary_key=True)
    user = relationship(User.__name__)
    tag = relationship(Tag.__name__)

    def serialize(self):
        return dict(
            user=self.user.serialize(),
            tag=self.tag.serialize()
        )
