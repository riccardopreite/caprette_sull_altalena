import math
from . import Utility

'''
Generic Enviroment configuration
'''
class Environment:
    def __init__(self, gravity, dissipativeForce, swingDegree,
    angluarSpeed, maxOscillationDegree, massBody, heightBody, massSwing, ropeLength):
        # basic setup
        self.gravity = gravity
        self.dissipativeForce = dissipativeForce
        self.initialSwingDegree = swingDegree
        self.initialAngluarSpeed = angluarSpeed
        self.swingDegree = swingDegree
        self.angluarSpeed = angluarSpeed
        self.maxOscillationDegree = maxOscillationDegree
        self.massBody = massBody
        self.heightBody = heightBody
        self.massSwing = massSwing
        self.ropeLength = ropeLength

        # common calculations utils
        self.utils = Utility.Utility()


    def setAngularSpeed(self,angularSpeed):
        self.angularSpeed = angularSpeed
        return self.angularSpeed
