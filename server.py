from random import randint
from time import strftime
from flask import Flask, render_template, flash, request, Response
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField
import os.path
import re
class ReusableForm(Form):
    name = TextField('Name:', validators=[validators.required()])
    surname = TextField('Surname:', validators=[validators.required()])

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__,static_url_path='', static_folder='webApp')
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'

@app.route('/handle_form', methods=['POST'])
def handle_form():
    form = request.form
    print("FOOOOR ")
    print(form)
    gravity = form["gravity"]
    babyHeight = form["babyHeight"]
    babyWeigth = form["babyWeigth"]
    ropeLength = form["ropeLength"]
    swingType = form["swingType"]
    print("gravity")
    print(gravity)
    print("babyHeight")
    print(babyHeight)
    print("babyWeigth")
    print(babyWeigth)
    print("ropeLength")
    print(ropeLength)
    print("swingType")
    print(swingType)
    return ""

@app.route('/')
def index():
    content = get_file('webApp/html/index.html')
    return Response(content, mimetype="text/html")


    #GET 1 ARG request.args.get('user')
    return render_template(request.query_string)


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')
