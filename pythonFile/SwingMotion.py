import math

class SwingMotion:
    gravity = dissipativeForce = initialPerturbationDegree = perturbationDegree = initialAngluarSpeed = angluarSpeed = maxOscillationDegree = massBody = heightBody = massSwing = ropeLength = 0.
    listRotationVar = listCoordinate = []
    def __init__(self, gravity, dissipativeForce, perturbationDegree, angluarSpeed, maxOscillationDegree, massBody, heightBody, massSwing, ropeLength):
        self.gravity = gravity
        self.dissipativeForce = dissipativeForce
        self.initialPerturbationDegree = perturbationDegree
        self.initialAngluarSpeed = angluarSpeed
        self.perturbationDegree = perturbationDegree
        self.angluarSpeed = angluarSpeed
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
