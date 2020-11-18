import math
import SwingMotion
import Utility

class SeatedSwing(SwingMotion.SwingMotion):
    getBodySegment = degreeBodyRotation = angularAcceleration = 0.
    swingMotion = None
    def __init__(self, swingMotion, degreeBodyRotation):
        self.swingMotion = swingMotion
        self.bodySegment = 0.5
        self.degreeBodyRotation = degreeBodyRotation


    def swingSeated(self,integrationMethode,steps):
        utils = Utility.Utility()
        if integrationMethode == "symplectic":
            utils.symplectic_seated(self,steps)
            # utils.plot_Seated()

    def w_seated(self, phi):
        self.angularAcceleration = -((self.swingMotion.gravity * self.swingMotion.ropeLength) / (self.swingMotion.ropeLength**2 + self.getBodySegment**2)) * math.sin(phi)
        return self.angularAcceleration
