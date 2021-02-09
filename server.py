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


no_simulationSteps = 30

app = Flask(__name__,static_url_path='', static_folder='webApp')
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'

socket = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


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


@socket.on('my_event', namespace='/test')
def test_message(message):
    print("OHHHH")
    emit('my_response', message)


@socket.on('handleRequest', namespace='/test')
def handleRequest(message):
    initBodyObj()
    form1 = message["data1"]
    form2 = message["data2"]
    runFirstsType(form1)
    runFirstsType(form2)
    print("CIAONNNNNNNNNNNNNNNNNNNNNNNNNNNN")
    switchForm(form1,form1["isSecond"],form1["swingTypeFirst"])
    print("CIAONNNNNNNNNNNNNNNNNNNNNNNNNNNN")
    switchForm(form2,form2["isSecond"],form2["swingTypeFirst"])
    print("CIAONNNNNNNNNNNNNNNNNNNNNNNNNNNN")

def runFirstsType(form):
    print("FORM")
    print(form["isSecond"])
    print(form)
    gravity = float(form["gravity"])
    heightBody = float(form["babyHeight"])
    massBody = float(form["babyWeigth"])/10
    ropeLength = float(form["ropeLength"])
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
        bodyObj[isSecond]["realisticSwing"].calculateSwingMotion("realistic", no_simulationSteps)
        emit(realisticString, bodyObj[isSecond]["realisticSwing"].frame_listRealistic);
    elif(swingTypeFirst == "combined"):
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
        asyncio.run(calculateSwing(bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],bodyObj[isSecond]["realisticSwing"],seatedString,realisticString,combinedString,"symplectic","realistic","combined",isSecond))
    elif(swingTypeFirst == "seated"):
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["realisticSwing"],bodyObj[isSecond]["realisticSwing"],standingString,realisticString,combinedString,"symplectic","realistic","combined",isSecond))
    elif(swingTypeFirst == "realistic"):
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],standingString,seatedString,combinedString,"symplectic","symplectic","combined",isSecond))
    elif(swingTypeFirst == "combined"):
        asyncio.run(calculateSwing(bodyObj[isSecond]["standingSwing"],bodyObj[isSecond]["seatedSwing"],bodyObj[isSecond]["realisticSwing"],standingString,seatedString,realisticString,"symplectic","symplectic","realistic",isSecond))


async def calculateSwing(second,third,fourth,secondString,thirdString,fourthString,secondStringMethode,thirdStringMethode,fourthStringMethode,isSecond):
    socket.on('connect')

    second.calculateSwingMotion(secondStringMethode, no_simulationSteps)

    if secondString == 'realistic' or secondString == 'realisticSecond':
        emit(secondString, second.frame_listRealistic);
    elif secondString == 'combined' or secondString == 'combinedSecond':
        emit(secondString, second.frame_listCombined);
    else:
        emit(secondString, second.frame_list);

    third.calculateSwingMotion(thirdStringMethode, no_simulationSteps)

    if thirdString == 'realistic' or thirdString == 'realisticSecond':
        emit(thirdString, third.frame_listRealistic);
    elif thirdString == 'combined' or thirdString == 'combinedSecond':
        emit(thirdString, third.frame_listCombined);
    else:
        emit(thirdString, third.frame_list);


    fourth.calculateSwingMotion(fourthStringMethode, no_simulationSteps)

    if fourthString == 'realistic' or fourthString == 'realisticSecond':
        emit(fourthString, fourth.frame_listRealistic);
    elif fourthString == 'combined' or fourthString == 'combinedSecond':
        emit(fourthString, fourth.frame_listCombined);
    else:
        emit(fourthString, fourth.frame_list);

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



if __name__ == '__main__':
    socket.run(app,port=8000,host='0.0.0.0', debug=True)
