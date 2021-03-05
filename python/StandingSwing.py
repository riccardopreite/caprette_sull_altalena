import math
from . import Environment

class StandingSwing(Environment.Environment):
    def __init__(self, environment):
        # self.environment = environment
        super().__init__(environment.gravity, environment.dissipativeForce, environment.swingDegree,
        environment.angluarSpeed, environment.maxOscillationDegree, environment.massBody, environment.heightBody, environment.massSwing, environment.ropeLength)

        # TODO baricenter should be indipendet from ropeLength <==========
        (self.barycenterSquat, self.barycenterStanding) = self.getBarycenter()
        # current body position
        self.currentBarycenter = self.barycenterSquat

        self.frame_list = []
        self.bodyCM_list = []

    '''
    Auxiliry, Calculate standing and squat barycenter from enviroment.bodyHeight and set local vars
    @self = from self.enviroment get bodyHeight
    @return = couple of baricenter squat and stand
    '''
    # TODO calculate barycenter based on height
    def getBarycenter(self):
        difference_StandingSquat = 0.4

        #MODIFICA: DETERMINAZIONE DEL CENTRO DI MASSA DEL BAMBINO A PARTIRE DA ALTEZZA E LUNGHEZZA CORDA
        # CENTRO DI MASSA QUANDO BIMBO IN PIEDI = LUNGH. CORDA - ALTEZZA/2
        # QUANDO SI ACCOVACCIA OVVIAMENTE LA DISTANZA TRA CENTRO DI MASSA BAMBINO E FULCRO CORDA AUMENTA
        # DI UNA DIFFERENCE_STANDINQSQUAT
        lstand = self.ropeLength - self.heightBody / 2
        lsquat = lstand + difference_StandingSquat

        return (lsquat, lstand)



    '''
    Auxiliry, express the change in angular speed given the phi angle
    @phi (int) = indicates the angle where the swingMotion is performed
    @return (int) = the new angularAcceleration value
    '''
    # TODO change name <===============================
    def get_angularAcceleration(self,phi):
        self.angularAcceleration = -(self.gravity / self.currentBarycenter) * math.sin(phi)
        return self.angularAcceleration


    '''
    Calculate Swing motion and set local list of rotation variables
    @integrationMethod (string) = ['symplectic','rk4']
    @steps (int) = indicates the nummber of simulation step (tf FLAVIO)
    '''
    def calculateSwingMotion(self,integrationMethod,steps):

        if integrationMethod == "symplectic":
            self.utils.symplectic_standing(self,steps)
