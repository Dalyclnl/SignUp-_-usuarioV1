"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    firstName = request.json.get('firstName', None)
    lastName = request.json.get('lastName', None)
    
    if not (firstName and lastName and email and password):
        return jsonify({'message': 'Missing data'}), 400

    hash_password = generate_password_hash(password)

    user = User(email=email, password = hash_password,  firstName=firstName, lastName = lastName )
    
    try:
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=user.serialize())
        return jsonify(access_token= access_token), 201
    except Exception as err:
        print(str(err))
        return jsonify({'message': str(err)}), 500

    #print(data) 
    #print(user.serialize())
    
   #return jsonify({"mensaje": "usuario creado con exito","user":user.serialize(),"token":token}),201


@api.route('/login', methods=['POST'])
def login_user():

    email=request.json.get("email", None)
    password=request.json.get("password", None)
    user=User.query.filter_by(email=email).one_or_none()
    if user:
        if password ==  user.password:
            token=create_access_token(identity=user.serialize())
            return jsonify({"token":token,"identity":user.serialize()}),202 
        else:  
            return jsonify({"msg":"bad password"}),401
    else:
        return jsonify({"msg":"bad user name or password"}),401


@api.route('/private', methods=['POST'])
@jwt_required() 
def handle_private():
   current_user_id = get_jwt_identity()
   user = User.query.get(current_user_id)
   return jsonify({"mensaje": "el usuario es quien dice ser","user":user.serialize()}),203