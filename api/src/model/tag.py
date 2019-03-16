import sqlalchemy as db

from src.db.sqlalchemy import Base


class Tag(Base):
    __tablename__ = 'unstuckoverflow_tag'

    id = db.Column(db.Integer, db.Sequence('unstuckoverflow_tag_id_seq', start=1, increment=1), primary_key=True)
    name = db.Column(db.String(100), primary_key=True)

    def serialize(self):
        return dict(
            id=self.id,
            name=self.name
        )
