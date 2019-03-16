import sqlalchemy as db

from src.db.sqlalchemy import Base


class Tag(Base):
    __tablename__ = 'unstuckoverflow_tag'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), primary_key=True)

    def serialize(self):
        return dict(
            id=self.id,
            name=self.name
        )
