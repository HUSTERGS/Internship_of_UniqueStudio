from flask import Flask, render_template, request, jsonify
import requests as rq
from lxml import html
import pymysql
import mysql.connector
app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template("client.html")


@app.route('/searchlink', methods=['POST', 'GET'])
def data():
    url = request.get_data().decode()
    responseTree = html.fromstring(rq.get(url).content)
    selector1 = responseTree.xpath(
        '//*[starts-with(@id, "postmessage_")]')
    selector2 = responseTree.xpath('//a[@class="xw1"]')
    print(selector1)
    print(selector2)
    responseData = {}
    number = len(selector2)
    for num in range(number):
        responseData[str(num)] = [selector2[num].xpath(
            'string(.)'), selector1[num].xpath('string(.)')]
    print(responseData)
    return jsonify(responseData)


@app.route('/register', methods=['GET'])
def returnregisterpage():
    return render_template("register.html")


@app.route('/registuser', methods=['POST'])
def regist():
    user = request.form.get('user')
    password = request.form.get('password')
    con = mysql.connector.connect(
        user='root', password='MySQL#232', database='users', use_unicode=True)
    cursor = con.cursor()
    cursor.execute(
        "select * from username_and_password where username = %s", (user,))
    value1 = cursor.fetchall()
    if (value1 == []):
        cursor.execute(
            "insert into username_and_password (username, password) values (%s, %s)", (user, password))
        return render_template('login.html')
    else:
        return '用户已存在'
    con.close()


@app.route('/login', methods=['POST'])
def login():
    user = request.form.get('user')
    password = request.form.get('password')
    con = mysql.connector.connect(
        user='root', password='MySQL#232', database='users', use_unicode=True)
    cursor = con.cursor()
    cursor.execute(
        "select * from username_and_password where username = %s and password = %s", (user, password))
    if (cursor.fetchall() == []):
        return '用户不存在或密码错误'
    else:
        return '登录成功'


if __name__ == '__main__':
    app.run(debug=True)
