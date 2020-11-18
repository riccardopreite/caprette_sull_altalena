import math

class SwingMotion:
    gravity = dissipativeForce = initialPerturbationDegree = initialAngluarSpeed = maxOscillationDegree = massBody = heightBody = massSwing = ropeLength = 0
    listRotationVar = listCoordinate = []
    def __init__(self, gravity, dissipativeForce, initialPerturbationDegree, initialAngluarSpeed, maxOscillationDegree, massBody, heightBody, massSwing, ropeLength):
        self.gravity = gravity
        self.dissipativeForce = dissipativeForce
        self.initialPerturbationDegree = initialPerturbationDegree
        self.initialAngluarSpeed = initialAngluarSpeed
        self.maxOscillationDegree = maxOscillationDegree
        self.massBody = massBody
        self.heightBody = heightBody
        self.massSwing = massSwing
        self.ropeLength = ropeLength

    def setAngularSpeed(self,angularSpeed):
        self.angularSpeed = angularSpeed
        return self.angularSpeed

    def saveRotationVar(self):
        pass

    def saveCoordinate(self):
        pass
