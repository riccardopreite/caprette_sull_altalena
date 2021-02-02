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
environment = None
standingSwing = None
realisticSwing = None
app = Flask(__name__,static_url_path='', static_folder='webApp')
app.config['SECRET_KEY'] = 'SjdnUends821Jsdlkvxh391ksdODnejdDw'

socket = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


@socket.on('my_event', namespace='/test')
def test_message(message):
    print("OHHHH")
    emit('my_response', message)

@socket.on('test', namespace='/test')
def test(message):
    form = message["data"]
    gravity = float(form["gravity"])
    heightBody = float(form["babyHeight"])
    massBody = float(form["babyWeigth"])/10
    ropeLength = float(form["ropeLength"])
    swingTypeFirst = form["swingTypeFirst"]
    swingTypeSecond = form["swingTypeSecond"]
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
    ret = {}
    if(swingTypeFirst == "standing"):

        if(swingTypeSecond == "seated"):
            asyncio.run(calculateSwing(standingSwing,seatedSwing,realisticSwing,realisticSwing,"standing","seated","realistic","combined","symplectic","symplectic","realistic","combined",ret))

        elif(swingTypeSecond == "realistic"):
            asyncio.run(calculateSwing(standingSwing,realisticSwing,seatedSwing,realisticSwing,"standing","realistic","seated","combined","symplectic","realistic","symplectic","combined",ret))

        elif(swingTypeSecond == "combined"):
            asyncio.run(calculateSwing(standingSwing,realisticSwing,seatedSwing,realisticSwing,"standing","combined","seated","realistic","symplectic","combined","symplectic","realistic",ret))
        else:
            asyncio.run(calculateSwing(standingSwing,seatedSwing,realisticSwing,realisticSwing,"standing","seated","realistic","combined","symplectic","symplectic","realistic","combined",ret))

    elif(swingTypeFirst == "seated"):
        if(swingTypeSecond == "standing"):
            asyncio.run(calculateSwing(seatedSwing,standingSwing,realisticSwing,realisticSwing,"seated","standing","realistic","combined","symplectic","symplectic","realistic","combined",ret))

        elif(swingTypeSecond == "realistic"):
            asyncio.run(calculateSwing(seatedSwing,realisticSwing,standingSwing,realisticSwing,"seated","realistic","standing","combined","symplectic","realistic","symplectic","combined",ret))

        elif(swingTypeSecond == "combined"):
            asyncio.run(calculateSwing(seatedSwing,realisticSwing,standingSwing,realisticSwing,"seated","combined","standing","realistic","symplectic","combined","symplectic","realistic",ret))

        else:
            asyncio.run(calculateSwing(seatedSwing,standingSwing,realisticSwing,realisticSwing,"seated","standing","realistic","combined","symplectic","symplectic","realistic","combined",ret))


    elif(swingTypeFirst == "realistic"):
        if(swingTypeSecond == "standing"):
            asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"realistic","standing","seated","combined","realistic","symplectic","combined","symplectic",ret))

        elif(swingTypeSecond == "seated"):
            asyncio.run(calculateSwing(realisticSwing,seatedSwing,standingSwing,realisticSwing,"realistic","seated","standing","combined","realistic","symplectic","combined","symplectic",ret))

        elif(swingTypeSecond == "combined"):
            asyncio.run(calculateSwing(realisticSwing,realisticSwing,standingSwing,seatedSwing,"realistic","combined","standing","seated","realistic","combined","symplectic","symplectic",ret))
        else:
            asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"realistic","standing","seated","combined","realistic","symplectic","combined","symplectic",ret))

    elif(swingTypeFirst == "combined"):
        if(swingTypeSecond == "standing"):
            asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"combined","standing","seated","realistic","combined","symplectic","realistic","symplectic",ret))
        elif(swingTypeSecond == "realistic"):
            asyncio.run(calculateSwing(realisticSwing,realisticSwing,standingSwing,seatedSwing,"combined","realistic","standing","seated","combined","realistic","symplectic","symplectic",ret))
        elif(swingTypeSecond == "seated"):
            asyncio.run(calculateSwing(realisticSwing,seatedSwing,standingSwing,realisticSwing,"combined","seated","standing","realistic","combined","symplectic","realistic","symplectic",ret))
        else:
            asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"combined","standing","seated","realistic","combined","symplectic","realistic","symplectic",ret))



async def calculateSwing(first,second,third,fourth,firstString,secondString,thirdString,fourthString,firstStringMethode,secondStringMethode,thirdStringMethode,fourthStringMethode,ret):
    no_simulationSteps = 20
    socket.on('connect')
    first.calculateSwingMotion(firstStringMethode, no_simulationSteps)
    ret[firstString] = []
    ret[firstString].append(first.frame_list)
    ret[firstString].append(first.bodyCM_list)
    emit(firstString, ret[firstString]);

    second.calculateSwingMotion(secondStringMethode, no_simulationSteps)
    ret[secondString] = []
    ret[secondString].append(second.frame_list)
    ret[secondString].append(second.bodyCM_list)
    emit(secondString, ret[secondString]);

    third.calculateSwingMotion(thirdStringMethode, no_simulationSteps)
    ret[thirdString] = []
    ret[thirdString].append(third.frame_list)
    ret[thirdString].append(third.bodyCM_list)
    emit(thirdString, ret[thirdString]);

    fourth.calculateSwingMotion(fourthStringMethode, no_simulationSteps)
    ret[fourthString] = []
    ret[fourthString].append(fourth.frame_list)
    ret[fourthString].append(fourth.bodyCM_list)
    emit(fourthString, ret[fourthString]);

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













# @app.route('/handle_form', methods=['POST'])
# def handle_form():
#     print("FOOOOR ")
#     print(form)
#     form = request.form
#     gravity = float(form["gravity"])
#     heightBody = float(form["babyHeight"])
#     massBody = float(form["babyWeigth"])/10
#     ropeLength = float(form["ropeLength"])
#     swingType = form["swingType"]
#     massUpper = massBody/2
#     massLower = massBody/2
#     bodyHeightUpper = heightBody*0.6
#     bodyHeightLower = heightBody*0.4
#
#     environment = Environment.Environment(gravity,dissipativeForce,
#      initialSwingDegree, initialAngluarSpeed, maxOscillationDegree,
#      massBody, heightBody, massSwing, ropeLength
#     )
#
#     standingSwing = StandingSwing.StandingSwing(environment)
#     seatedSwing = SeatedSwing.SeatedSwing(environment)
#
#     realisticSwing = RealisticSwing.RealisticSwing(environment, massSwing,
#      massUpper, massLower,
#      bodyHeightUpper, bodyHeightLower,
#      theta, theta0
#     )
#     ret = {}
#     if(swingType == "standing"):
#         asyncio.run(calculateSwing(standingSwing,seatedSwing,realisticSwing,realisticSwing,"standing","seated","realistic","combined","symplectic","symplectic","realistic","combined",ret))
#     elif(swingType == "seated"):
#         asyncio.run(calculateSwing(seatedSwing,standingSwing,realisticSwing,realisticSwing,"seated","standing","realistic","combined","symplectic","symplectic","realistic","combined",ret))
#     elif(swingType == "realistic"):
#         asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"realistic","standing","seated","combined","realistic","combined","symplectic","symplectic",ret))
#     elif(swingType == "combined"):
#         asyncio.run(calculateSwing(realisticSwing,standingSwing,seatedSwing,realisticSwing,"combined","standing","seated","realistic","combined","realistic","symplectic","symplectic",ret))
#
#     response = app.response_class(
#         response=json.dumps({}),
#         status=200,
#         mimetype='application/json'
#     )
#     print("sending")
#     return response




    # @socket.on('my_broadcast_event', namespace='/test')
    # def test_broadcast_message(message):
    #     # session['receive_count'] = session.get('receive_count', 0) + 1
    #     emit('my_response',
    #          {"ciao": "GAY2"},
    #          broadcast=True)
