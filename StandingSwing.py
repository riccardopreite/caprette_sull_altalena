import math
import SwingMotion
import Utility

class StandingSwing(SwingMotion.SwingMotion):
    #angularAcceleration sarebbe w_dot
    barycenterSquat = barycenterStanding = angularAcceleration = 0.
    swingMotion = None
    def __init__(self,swingMotion):
        #istanzia oggetto initialPerturbationDegree
        # SwingMotion.SwingMotion(self)
        self.swingMotion = swingMotion
        self.barycenterSquat = self.swingMotion.ropeLength#e' giusto che il baricentro in squat sia uguale alla lunghezza della corda?
        self.barycenterStanding = self.swingMotion.ropeLength - 0.4 # la differenza fra il baricentro in piedi e in squat era di 0.4

    def getBarycenter(self):
        #calculate from height from parent and create barycenter in sqaut position and standind position
        #self.barycenterSquat = parent.height
        #self.barycenterStanding = 0
        pass

    def swingStanding(self,integrationMethode,steps):
        utils = Utility.Utility()
        if integrationMethode == "symplectic":
            utils.symplectic_standing(self,steps)
            # utils.plot_Standing()

    def angularAccelerationStanding(self, phi):
        self.angularAcceleration = -(self.swingMotion.gravity / self.barycenterSquat) * math.sin(phi)
        return self.angularAcceleration
