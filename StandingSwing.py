import math
import SwingMotion
import Utility

class StandingSwing(SwingMotion.SwingMotion):
    barycenterSquat = barycenterStanding = 0

    def __init__(self,parentDeclareMain):
        #istanzia padre.init(parentDeclareMain.gravity,5)
        #istanzia oggetto initialPerturbationDegree
        #padre.gravity
        self.barycenterSquat = 0
        self.barycenterStanding = 0

    def getBarycenter(self):
        #calculate from height from parent and create barycenter in sqaut position and standind position
        #self.barycenterSquat = parent.height
        #self.barycenterStanding = 0
        pass

    def swingStanding(self,integrationMethode):
        pass
