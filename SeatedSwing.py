import math
import SwingMotion
import Utility

class SeatedSwing(SwingMotion.SwingMotion):
    getBodySegment = degreeBodyRotation = 0
    def __init__(self, getBodySegment, degreeBodyRotation):
        self.getBodySegment = getBodySegment
        self.degreeBodyRotation = degreeBodyRotation


    def swingSeated(self,integrationMethode):
        pass
