import math
from . import Environment

class SeatedSwing(Environment.Environment):
    def __init__(self, environment):
        self.environment = environment
        self.bodySegment = (environment.heightBody)/2

        # degreeBodyRotation = theta
        self.degreeBodyRotation = math.pi/2

        #MODIFICHE COORDINATE SEATED.
        #PER SEATED ABBIAMO DUE PUNTI DA DISEGNARE: HO FATTO 3 LISTE DI COORDIANTE, PARTE ALTA BASSA E ALTALENA
        # self.coordinates_upperBody = []
        # self.coordinates_lowerBody = []
        # self.coordinates_swing = []

        self.frame_list = []
        self.bodyCM_list = []


    '''
    Auxiliry, express the change in angular speed given the phi angle
    @phi (int) = indicates the angle where the swingMotion is performed
    @return (int) = the new angularAcceleration value
    '''
    def get_angularAcceleration(self, phi):
        self.angularAcceleration = -((self.environment.gravity * self.environment.ropeLength) / (self.environment.ropeLength**2 + self.bodySegment**2)) * math.sin(phi)
        return self.angularAcceleration


    '''
    Calculate Swing motion and set local list of rotation variables
    @integrationMethod (string) = ['symplectic','rk4']
    @steps (int) = indicates the nummber of simulation step (tf FLAVIO)
    '''
    def calculateSwingMotion(self,integrationMethode,steps):

        if integrationMethode == "symplectic":
            self.environment.utils.symplectic_seated(self,steps)
