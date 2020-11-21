import math
import Utility

'''
Generic Enviroment configuration
'''
class Environment:
    def __init__(self, gravity = 0, dissipativeForce = 0, swingDegree = 0, 
    angluarSpeed = 0, maxOscillationDegree = 0, massBody = 0, heightBody = 0, massSwing = 0, ropeLength = 0):
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
