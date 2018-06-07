import flask
from flask import Flask

app = Flask(__name__)


@app.route('/senddata', methods=['POST'])
def senddata():
    data = flask.request.form.get('data')
    print(data)
