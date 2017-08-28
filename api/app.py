from flask import Flask
# from flask import request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
# from json import dumps
from flask_jsonpify import jsonify
from flask_cors import CORS

db_connect = create_engine('sqlite:///db.db')
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

"""
class Employees(Resource):
    def get(self):
        # connect to database
        conn = db_connect.connect()
        # This line performs query and returns json result
        query = conn.execute("select * from employees")
        # Fetches first column that is Employee ID
        return {'employees': [i[0] for i in query.cursor.fetchall()]}


class Tracks(Resource):
    def get(self):
        conn = db_connect.connect()
        query = conn.execute(
            "select trackid, name, composer, unitprice from tracks;")
        result = {
            'data': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


class Employees_Name(Resource):
    def get(self, employee_id):
        conn = db_connect.connect()
        query = conn.execute(
            "select * from employees where EmployeeId =%d " % int(employee_id))
        result = {
            'data': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)
"""


class Officers(Resource):
    def get(self):
        # connect to database
        conn = db_connect.connect()
        # This line performs query and returns json result
        query = conn.execute("select * from data")
        # Fetches first column that is Employee ID
        return {'data': [i for i in query.cursor.fetchall()]}


class Officers_Id(Resource):
    def get(self, officer_id):
        conn = db_connect.connect()
        query = conn.execute(
            "select * from data where id = '{:d}'".format(int(officer_id)))
        result = {
            'data': [dict(zip(tuple(query.keys()), i)) for i in query.cursor]}
        return jsonify(result)


api.add_resource(Officers, '/officers')
api.add_resource(Officers_Id, '/officers/<officer_id>')
"""
api.add_resource(Employees, '/employees')  # Route_1
api.add_resource(Tracks, '/tracks')  # Route_2
api.add_resource(Employees_Name, '/employees/<employee_id>')  # Route_3
"""

if __name__ == '__main__':
    app.run(port='5002')
