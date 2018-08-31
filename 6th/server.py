from flask import Flask, render_template, request, jsonify
import requests as rq
from lxml import html, etree
from selenium import webdriver
import mysql.connector
from time import sleep
from selenium.webdriver.common.keys import Keys
#import pickle
app = Flask(__name__)


@app.route('/', methods=['GET'])
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


@app.route('/search', methods=['POST'])
def search():
    '''wd = webdriver.Chrome('D:\chromedriver.exe')
    loginUrl = 'http://bbs.mycraft.cc/member.php?mod=logging&action=login'
    wd.get(loginUrl)
    account = wd.find_element_by_css_selector(
        "input[name='username'][id^='username']")

    password = wd.find_element_by_css_selector(
        "input[name='password'][id^='password3']")
    wd.find_element_by_css_selector("button[name='loginsubmit']").click()
    account.send_keys("G-_-S")
    password.send_keys("gs123456")
    password.send_keys(Keys.RETURN)
    sleep(10)'''
    req = rq.Session()
    req.headers.clear()
    '''cookies = wd.get_cookies()
    for cookie in cookies:
        req.cookies.set(cookie['name'], cookie['value'])'''
    searchTarget = request.get_data().decode()
    naiveURL1 = 'http://bbs.mycraft.cc/search.php?searchsubmit=yes&mod=forum&formhash=ba678760&srchtype=title&srhfid=&srhlocality=forum%3A%3Aindex&srchtxt='
    naiveURL2 = '&searchsubmit=true'
    myrequest = req.get(naiveURL1 + searchTarget + naiveURL2, cookies={'WN1p0_2132_auth': '7dd0qIswz3otrVCf5fnG8NrbUszRJmrkN3f3nrvRzjMbYlvhZ3xp0KvdKHu3gQ2EokF7J%2B6sh6oFUsHP4Nx2xaWlfg', 'WN1p0_2132_saltkey': 'GX2zQCio'}, headers={'Connection': 'keep-alive', 'Upgrade-Insecure-Requests': '1', 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Safari/537.36',
                                                                                                                                                                                                                                      'DNT': '1', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN,zh;q=0.9'}).content
    responseTree = html.fromstring(myrequest)
    return etree.tounicode(responseTree.xpath("//div[@class='tl']")[0])


@app.route('/register', methods=['GET'])
def returnregisterpage():
    return render_template("register.html")


@app.route('/registuser', methods=['POST'])
def regist():
    user = request.form.get('user')
    password = request.form.get('password1')
    email = request.form.get('email')
    con = mysql.connector.connect(
        user='root', password='MySQL#232', database='users', use_unicode=True)
    cursor = con.cursor()
    cursor.execute(
        "select * from usersdata where username = %s", (user,))
    value1 = cursor.fetchall()
    print(value1)
    print(user)
    print(password)
    if (value1 == []):
        cursor.execute(
            "insert into usersdata (username, password, email ) values (%s, %s, %s)", (user, password, email))
        con.commit()
        con.close()
        return '注册成功'
    else:
        con.close()
        return '用户已存在'


@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')


@app.route('/userlogin', methods=['POST'])
def userlogin():
    user = request.form.get('user')
    password = request.form.get('password')
    con = mysql.connector.connect(
        user='root', password='MySQL#232', database='users', use_unicode=True)
    cursor = con.cursor()
    cursor.execute(
        "select * from usersdata where username = %s and password = %s", (user, password))
    if (cursor.fetchall() == []):
        con.close()
        return '用户不存在或密码错误'
    else:
        con.close()
        return '登录成功'


@app.route('/forgetpw')
def forgetpw():
    return render_template('forgetpw.html')


@app.route('/findpw', methods=['POST'])
def findpw():
    user = request.form.get('user')
    email = request.form.get('email')
    con = mysql.connector.connect(
        user='root', password='MySQL#232', database='users', use_unicode=True)
    cursor = con.cursor()
    cursor.execute(
        "select * from usersdata where username = %s and email = %s", (user, email))
    result = cursor.fetchall()
    if (result == []):
        con.close()
        return '用户不存在或邮箱错误'
    else:
        con.close()
        print(result)
        return '您的密码为: ' + result[0][1]


if __name__ == '__main__':
    app.run(debug=True)
# http://bbs.mycraft.cc/search.php?searchsubmit=yes&mod=forum&formhash=ba678760&srchtype=title&srhfid=&srhlocality=forum%3A%3Aindex&srchtxt=&searchsubmit=true
#{'WN1p0_2132_auth': '7dd0qIswz3otrVCf5fnG8NrbUszRJmrkN3f3nrvRzjMbYlvhZ3xp0KvdKHu3gQ2EokF7J%2B6sh6oFUsHP4Nx2xaWlfg', 'WN1p0_2132_saltkey': 'GX2zQCio'}
