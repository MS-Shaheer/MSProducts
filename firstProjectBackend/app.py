from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

from model import db, ProductsModel

app = Flask(__name__)

cors = CORS(app)

app.config['SECRET_KEY'] = 'shamoil18babar56'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api =  Api(app)
db.init_app(app)

@app.before_first_request
def create_table():
    db.create_all()

class ProductsView(Resource):
    def get(self):
        products = ProductsModel.query.all()

        return ({'Products': list(x.json() for x in products)})
    
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='Cannot leave it blank !!!')
        parser.add_argument('description', type=str, required=False, help='Cannot leave it blank !!!')
        parser.add_argument('price', type=float, required=True, help='Cannot leave it blank !!!')
        parser.add_argument('company', type=str, required=True, help='Cannot leave it blank !!!')
        parser.add_argument('year_released', type=int, required=True, help='Cannot leave it blank !!!')
        parser.add_argument('discontinued', type=str, required=False, help='Cannot leave it blank !!!')

        data = request.get_json()
        new_product = ProductsModel(
            data['name'],
            data['description'],
            data['price'],
            data['company'],
            data['year_released'],
            data['discontinued']
        )
        db.session.add(new_product)
        db.session.commit()
        db.session.flush()
        
        return new_product.json(), 201

class SingleProductView(Resource):
    def get(self, id):
        product = ProductsModel.query.filter_by(id=id).first()
        if product:
            return product.json()
        else:
            return ({'message': 'Product doesnot exists !!!'}, 404)
    
    def delete(self, id):
        product = ProductsModel.query.filter_by(id=id).first()
        if product:
            db.session.delete(product)
            db.session.commit()
            return ({'message': 'Product Deleted.'})
        else:
            return ({'message': 'Deletion Unsuccessful as Product is not found !!!'}, 404)
        
    def put(self, id):
        data = request.get_json()
        product = ProductsModel.query.filter_by(id=id).first()
        if product:
            product.name = data['name']
            product.description = data['description']
            product.price = data['price']
            product.company = data['company']
            product.year_released = data['year_released']
            product.discontinued = data['discontinued']
            # return ({'message': 'Product Updated.'})
        else:
            # return ({'message': 'Update Unsuccessful as Product is not found !!!'}, 404)
            product = ProductsModel(id=id, **data)
        
        db.session.add(product)
        db.session.commit()
        
        return product.json()

api.add_resource(ProductsView, '/products')
api.add_resource(SingleProductView, '/product/<int:id>')

if (__name__ == '__main__'):
    app.run(debug=True)
