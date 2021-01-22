from random import randint
from time import strftime
from flask import Flask, render_template, flash, request, Response,jsonify,make_response
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField
import os.path
import re
from python import StandingSwing,Environment,SeatedSwing,RealisticSwing,Utility
import json

#Init Var (To move to a class?)
dissipativeForce = 0.
initialSwingDegree = 0.01
initialAngluarSpeed = 0.0
maxOscillationDegree = 0.
massSwing = 3.
theta = 1.50
theta0 = 0.1
massUpper = 0
massLower = 0
bodyHeightUpper = 0
bodyHeightLower = 0

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__,static_url_path='', static_folder='webApp')
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'

@app.route('/handle_form', methods=['POST'])
def handle_form():
    form = request.form
    print("FOOOOR ")
    gravity = float(form["gravity"])
    heightBody = float(form["babyHeight"])
    massBody = float(form["babyWeigth"])/10
    ropeLength = float(form["ropeLength"])
    standing = bool(int(form["Standing"]))
    seated = bool(int(form["Seated"]))
    realistic = bool(int(form["Realistic"]))
    combined = bool(int(form["Combined"]))

    massUpper = massBody/2
    massLower = massBody/2
    bodyHeightUpper = heightBody*0.6
    bodyHeightLower = heightBody*0.4

    environment = Environment.Environment(gravity,dissipativeForce,
     initialSwingDegree, initialAngluarSpeed, maxOscillationDegree,
     massBody, heightBody, massSwing, ropeLength
    )

    standingSwing = StandingSwing.StandingSwing(environment)
    seatedSwing = SeatedSwing.SeatedSwing(environment)

    realisticSwing = RealisticSwing.RealisticSwing(environment, massSwing,
     massUpper, massLower,
     bodyHeightUpper, bodyHeightLower,
     theta, theta0
    )

    ret = []
    # ret = json.loads({''})
    no_simulationSteps = 20
    if standing == True:
        standingSwing.calculateSwingMotion("symplectic", no_simulationSteps)
        ret.append(standingSwing.frame_list)
        ret.append(standingSwing.bodyCM_list)
    if seated == True :
        seatedSwing.calculateSwingMotion('symplectic', no_simulationSteps)
        ret.append(seatedSwing.frame_list)
        ret.append(seatedSwing.bodyCM_list)
    if realistic == True:
        realisticSwing.calculateSwingMotion("realistic", no_simulationSteps)
        ret.append(realisticSwing.frame_list)
        ret.append(realisticSwing.bodyCM_list)
    if combined == True:
        realisticSwing.calculateSwingMotion('combined', no_simulationSteps)
        ret.append(realisticSwing.frame_list)
        ret.append(realisticSwing.bodyCM_list)
    print(ret)
    return make_response(json.dumps(ret))

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
