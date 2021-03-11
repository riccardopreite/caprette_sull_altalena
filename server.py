import ws
import os.path
import re
import json
import asyncio

from random import randint
from time import strftime
from flask import Flask, render_template, flash, request, session, copy_current_request_context,Response,jsonify,make_response
from flask_socketio import SocketIO, emit, disconnect
from threading import Lock
from python import StandingSwing,Environment,SeatedSwing,RealisticSwing,Utility

#Init Var (To move to a class?)
dissipativeForce = 0.
initialSwingDegree = -0.50
initialAngluarSpeed = 0.0
maxOscillationDegree = 0.
massSwing = 3.
theta = 1.50
theta0 = 0.1
massUpper = 0
massLower = 0
bodyHeightUpper = 0
bodyHeightLower = 0

async_mode = None

bodyObj = {}

environment = None
standingSwing = None
seatedSwing = None
realisticSwing = None

standingString = None
seatedString = None
realisticString = None
combinedString = None


no_simulationSteps = 15

app = Flask(__name__,static_url_path='', static_folder='webApp')
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'

socket = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()



@socket.on('my_event', namespace='/test')
def test_message(message):
    print("OHHHH")
    emit('my_response', message)

@socket.on('handleGeneticRequest', namespace='/test')
def handleRequest(message):
    initBodyObj()
    form1 = message["data"]
    print("CIAOULHADSIFFFFFFFFFFFFFFFFFFFFFFFFFF")

    runGeneticType(form1)


@socket.on('handleRequest', namespace='/test')
def handleRequest(message):
    initBodyObj()
    form1 = message["data1"]
    form2 = message["data2"]
    runFirstType(form1)
    switchForm(form1,form1["isSecond"],form1["swingTypeFirst"])
    runFirstType(form2)
    switchForm(form2,form2["isSecond"],form2["swingTypeFirst"])

@socket.on('handleRequestFirst', namespace='/test')
def handleRequest(message):
    initBodyObj()
    form1 = message["data1"]
    runFirstType(form1)

@socket.on('handleRequestSecond', namespace='/test')
def handleRequest(message):
    initBodyObj()
    form2 = message["data2"]
    runFirstType(form2)


def runGeneticType(form):
    gravity = float(form["gravity"])
    heightBody = float(form["height"])
    massBody = float(form["weigth"])/10
    ropeLength = float(form["ropeLength"])
    initialSwingDegree = float(form["phi"])
    initialAngluarSpeed = float(form["w"])
    swingTypeFirst = form["swingTypeFirst"]
    isSecond = form["isSecond"]
    massUpper = massBody/2
    massLower = massBody/2
    bodyHeightUpper = heightBody*0.6
    bodyHeightLower = heightBody*0.4
    bodyObj[isSecond]["enviroment"] = Environment.Environment(gravity,dissipativeForce,
     initialSwingDegree, initialAngluarSpeed, maxOscillationDegree,
     massBody, heightBody, massSwing, ropeLength
    )

    bodyObj[isSecond]["standingSwing"] = StandingSwing.StandingSwing(bodyObj[isSecond]["enviroment"])
    bodyObj[isSecond]["seatedSwing"] = SeatedSwing.SeatedSwing(bodyObj[isSecond]["enviroment"])

    bodyObj[isSecond]["realisticSwing"] = RealisticSwing.RealisticSwing(bodyObj[isSecond]["enviroment"], massSwing,
     massUpper, massLower,
     bodyHeightUpper, bodyHeightLower,
     theta, theta0
    )

    if(isSecond):
        standingString = "standingSecond"
        seatedString = "seatedSecond"
        realisticString = "realisticSecond"
        combinedString = "combinedSecond"
    else:
        standingString = "standing"
        seatedString = "seated"
        realisticString = "realistic"
        combinedString = "combined"

    if(swingTypeFirst == "standing"):
        bodyObj[isSecond]["standingSwing"].calculateSwingMotion("symplectic", no_simulationSteps)
        emit("secondCalculated", bodyObj[isSecond]["standingSwing"].frame_list);
    elif(swingTypeFirst == "seated"):
        bodyObj[isSecond]["seatedSwing"].calculateSwingMotion("symplectic", no_simulationSteps)
        emit("secondCalculated", bodyObj[isSecond]["seatedSwing"].frame_list);
    elif(swingTypeFirst == "realistic"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        bodyObj[isSecond]["realisticSwing"].calculateSwingMotion("realistic", no_simulationSteps)
        emit("secondCalculated", bodyObj[isSecond]["realisticSwing"].frame_listRealistic);
    elif(swingTypeFirst == "combined"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        bodyObj[isSecond]["realisticSwing"].calculateSwingMotion("combined", no_simulationSteps)
        emit("secondCalculated", bodyObj[isSecond]["realisticSwing"].frame_listCombined);

def runFirstType(form):
    print("FORM")
    print(form["isSecond"])
    print(form)
    gravity = float(form["gravity"])
    heightBody = float(form["height"])
    massBody = float(form["weigth"])/10
    ropeLength = float(form["ropeLength"])
    initialSwingDegree = float(form["phi"])
    initialAngluarSpeed = float(form["w"])
    swingTypeFirst = form["swingTypeFirst"]
    isSecond = form["isSecond"]
    massUpper = massBody/2
    massLower = massBody/2
    bodyHeightUpper = heightBody*0.6
    bodyHeightLower = heightBody*0.4
    bodyObj[isSecond]["enviroment"] = Environment.Environment(gravity,dissipativeForce,
     initialSwingDegree, initialAngluarSpeed, maxOscillationDegree,
     massBody, heightBody, massSwing, ropeLength
    )

    bodyObj[isSecond]["standingSwing"] = StandingSwing.StandingSwing(bodyObj[isSecond]["enviroment"])
    bodyObj[isSecond]["seatedSwing"] = SeatedSwing.SeatedSwing(bodyObj[isSecond]["enviroment"])

    bodyObj[isSecond]["realisticSwing"] = RealisticSwing.RealisticSwing(bodyObj[isSecond]["enviroment"], massSwing,
     massUpper, massLower,
     bodyHeightUpper, bodyHeightLower,
     theta, theta0
    )

    if(isSecond):
        standingString = "standingSecond"
        seatedString = "seatedSecond"
        realisticString = "realisticSecond"
        combinedString = "combinedSecond"
    else:
        standingString = "standing"
        seatedString = "seated"
        realisticString = "realistic"
        combinedString = "combined"

    if(swingTypeFirst == "standing"):
        bodyObj[isSecond]["standingSwing"].calculateSwingMotion("symplectic", no_simulationSteps)
        emit(standingString, bodyObj[isSecond]["standingSwing"].frame_list);
    elif(swingTypeFirst == "seated"):
        bodyObj[isSecond]["seatedSwing"].calculateSwingMotion("symplectic", no_simulationSteps)
        emit(seatedString, bodyObj[isSecond]["seatedSwing"].frame_list);
    elif(swingTypeFirst == "realistic"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        bodyObj[isSecond]["realisticSwing"].calculateSwingMotion("realistic", no_simulationSteps)
        emit(realisticString, bodyObj[isSecond]["realisticSwing"].frame_listRealistic);
    elif(swingTypeFirst == "combined"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        bodyObj[isSecond]["realisticSwing"].calculateSwingMotion("combined", no_simulationSteps)
        emit(combinedString, bodyObj[isSecond]["realisticSwing"].frame_listCombined);


    if isSecond:
        emit("firstsCalculated","firstsCalculated")

def switchForm(form,isSecond,swingTypeFirst):
    if(isSecond):
        standingString = "standingSecond"
        seatedString = "seatedSecond"
        realisticString = "realisticSecond"
        combinedString = "combinedSecond"
    else:
        standingString = "standing"
        seatedString = "seated"
        realisticString = "realistic"
        combinedString = "combined"

    if(swingTypeFirst == "standing"):
        print("calcolo")
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        asyncio.run(calculateSwing(bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],bodyObj[isSecond]["realisticSwing"],seatedString,realisticString,combinedString,"symplectic","realistic","combined",isSecond))
    elif(swingTypeFirst == "seated"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["realisticSwing"],bodyObj[isSecond]["realisticSwing"],standingString,realisticString,combinedString,"symplectic","realistic","combined",isSecond))
    elif(swingTypeFirst == "realistic"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],standingString,seatedString,combinedString,"symplectic","symplectic","combined",isSecond))
    elif(swingTypeFirst == "combined"):
        bodyObj[isSecond]["realisticSwing"].theta0 = 0.1
        bodyObj[isSecond]["realisticSwing"].theta = 1.5
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],standingString,seatedString,realisticString,"symplectic","symplectic","realistic",isSecond))

async def calculateSwing(second,third,fourth,secondString,thirdString,fourthString,secondStringMethode,thirdStringMethode,fourthStringMethode,isSecond):
    socket.on('connect')

    resetTheta(second)
    callSwingMotion(second,secondString,secondStringMethode,no_simulationSteps)

    resetTheta(third)
    callSwingMotion(third,thirdString,thirdStringMethode,no_simulationSteps)

    resetTheta(fourth)
    callSwingMotion(fourth,fourthString,fourthStringMethode,no_simulationSteps)

    if(isSecond):
        emit("disconnect")

@app.route('/')
def index():
    content = get_file('webApp/index.html')
    return Response(content, mimetype="text/html")


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        return open(src).read()
    except IOError as exc:
        return str(exc)





@socket.on('disconnect_request', namespace='/test')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)


def callSwingMotion(object,objectString,objectStringMethode,no_simulationSteps):
    object.calculateSwingMotion(objectStringMethode, no_simulationSteps)
    if "realistic" in objectString:
        emit(objectString, object.frame_listRealistic);
    elif "combined" in objectString:
        emit(objectString, object.frame_listCombined);
    else:
        emit(objectString, object.frame_list);


def initBodyObj():
    i = 0
    while i < 2:
        bodyObj[i] = {}
        bodyObj[i]["enviroment"] = None
        bodyObj[i]["standingSwing"] = None
        bodyObj[i]["seatedSwing"] = None
        bodyObj[i]["realisticSwing"] = None
        i = i + 1

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

def resetTheta(obj):  # pragma: no cover
    if(isinstance(obj, RealisticSwing.RealisticSwing)):
        obj.theta0 = 0.1
        obj.theta = 1.5

if __name__ == '__main__':
    socket.run(app,port=8000,host='0.0.0.0', debug=True)
