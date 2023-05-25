from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class ProductsModel(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    price = db.Column(db.Integer(), nullable=False)
    company = db.Column(db.String(25), nullable=False)
    year_released = db.Column(db.Integer(), nullable=False)
    discontinued = db.Column(db.String(3), nullable=True)

    def __init__(self, name, description, price, company, year_released, discontinued):
        self.name = name
        self.description = description
        self.price = price
        self.company = company
        self.year_released = year_released
        self.discontinued = discontinued

    def json(self):
        return ({
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'company': self.company,
            'year_released': self.year_released,
            'discontinued': self.discontinued
        })
