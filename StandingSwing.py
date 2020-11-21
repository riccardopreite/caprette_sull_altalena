import Environment
import math
import Utility

class StandingSwing():
    def __init__(self, environment):
        self.environment = environment

        # TODO baricenter should be indipendet from ropeLength <==========
        (self.barycenterSquat, self.barycenterStanding) = self.getBarycenter(self.environment)
        # current body position
        self.currentBarycenter = self.barycenterSquat

        #  rotations variables
        self.listRotation_t = []
        self.listRotation_phi = []
        self.listRotation_w = []

        self.coordinates = []
        self.coordinates_swing = []


    '''
    Auxiliry, Calculate standing and squat barycenter from enviroment.bodyHeight and set local vars
    @self = from self.enviroment get bodyHeight
    @return = couple of baricenter squat and stand
    '''
    # TODO calculate barycenter based on height
    def getBarycenter(self, enviroment):
        difference_StandingSquat = 0.4

        #MODIFICA: DETERMINAZIONE DEL CENTRO DI MASSA DEL BAMBINO A PARTIRE DA ALTEZZA E LUNGHEZZA CORDA
        # CENTRO DI MASSA QUANDO BIMBO IN PIEDI = LUNGH. CORDA - ALTEZZA/2
        # QUANDO SI ACCOVACCIA OVVIAMENTE LA DISTANZA TRA CENTRO DI MASSA BAMBINO E FULCRO CORDA AUMENTA
        # DI UNA DIFFERENCE_STANDINQSQUAT
        lstand = enviroment.ropeLength - enviroment.heightBody / 2
        lsquat = lstand + difference_StandingSquat

        return (lsquat, lstand)



    '''
    Auxiliry, express the change in angular speed given the phi angle
    @phi (int) = indicates the angle where the swingMotion is performed
    @return (int) = the new angularAcceleration value
    '''
    # TODO change name <===============================
    def get_angularAcceleration(self,phi):
        self.angularAcceleration = -(self.environment.gravity / self.currentBarycenter) * math.sin(phi)
        return self.angularAcceleration


    '''
    Calculate Swing motion and set local list of rotation variables
    @integrationMethod (string) = ['symplectic','rk4']
    @steps (int) = indicates the nummber of simulation step (tf FLAVIO)
    '''
    def calculateSwingMotion(self,integrationMethod,steps):

        if integrationMethod == "symplectic":
            self.environment.utils.symplectic_standing(self,steps)

    
