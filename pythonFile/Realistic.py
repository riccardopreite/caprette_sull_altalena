
import Environment
import math

class RealisticSwing(Environment.Environment):
    def __init__(self, environment):
        self.environment = environment
        
        self.bodySegment = 0.5

        # TODO change names <=====================
        # indicates rotations variables
        self.listRotation_t = []
        self.listRotation_phi = []
        self.listRotation_w = []


    '''
    Auxiliry, express the change in angular speed given the phi angle
    @phi (int) = indicates the angle where the swingMotion is performed
    @return (int) = the new angularAcceleration value
    '''
    def get_angularAcceleration(self, phi):
        pass

    '''
    Calculate Swing motion and set local list of rotation variables
    @integrationMethod (string) = ['symplectic','rk4']
    @steps (int) = indicates the nummber of simulation step (tf FLAVIO)
    '''
    def calculateSwingMotion(self,integrationMethode,steps):
      pass