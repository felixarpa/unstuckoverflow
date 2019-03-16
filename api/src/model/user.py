import sqlalchemy as db

from src.db.sqlalchemy import Base


class User(Base):
    __tablename__ = 'unstuckoverflow_user'

    id = db.Column(db.Integer, db.Sequence('unstuckoverflow_user_id_seq', start=1, increment=1), primary_key=True)
    username = db.Column(db.String(100), primary_key=True)
    company = db.Column(db.String(100), primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(500), nullable=False)

    def serialize(self):
        return dict(
            id=self.id,
            username=self.username,
            company=self.company,
            full_name=self.full_name,
            email=self.email,
            phone_number=self.phone_number
        )
