import math
import SwingMotion
import Utility

class RealisticSwing(SwingMotion.SwingMotion):
    bodyHeightUpper = bodyHeightLower = massUpper = massLower = degreeBodyRotation = 0.
    swingMotion = None
    def __init__(self, swingMotion, degreeBodyRotation):
        #retreive heigth from parent
        #calculate heigth retreived
        #self.bodyHeightUpper = bodyHeightUpper
        #self.bodyHeightLower = bodyHeightLower
        #retreive mass from parent
        #calculate mass retreived
        #self.massUpper = massUpper
        #self.massLower = massLower
        self.swingMotion = swingMotion
        self.degreeBodyRotation = degreeBodyRotation

    def swingRealistic(self,integrationMethode):
        pass
